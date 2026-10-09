// JSON-only Pages-CMS-equivalent fixture, not an authenticated save.
// Verified against pages-cms/pages-cms 6f4e860a35d934406580287e7042e5e111e207a1:
// files/[path]/route.ts validates declared fields, merges objects, replaces arrays,
// sanitizes empty values, and serializes JSON with two-space indentation.
export function resolveField(field: any, components: any): any {
  return field.component ? { ...components[field.component], ...field } : field;
}

const empty = (value: any): boolean => value == null || value === '' ||
  (typeof value === 'object' && Object.values(value).every(empty));

// Independent raw-content oracle: schema parsing must not hide lost unknown keys.
export function assertPreservedContent(expected: any, actual: any, path = '$'): void {
  if (actual === undefined && empty(expected)) return; // documented CMS empty cleanup
  if (expected && typeof expected === 'object') {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual) !== Array.isArray(expected)) throw new Error(path + ': nonempty content lost');
    if (Array.isArray(expected) && actual.length !== expected.length) throw new Error(path + ': list length changed');
    for (const key of Object.keys(expected)) assertPreservedContent(expected[key], actual[key], path + '.' + key);
    for (const key of Object.keys(actual)) if (!(key in expected)) throw new Error(path + '.' + key + ': unexpected content');
  } else if (expected !== actual) throw new Error(path + ': content changed');
}

// Supported JSON field subset: required values, optional empty objects, list bounds.
// Pages CMS performs its full field-type validation in the authenticated save.
export function validateCmsForm(value: any, fields: any[], components: any, path = '$'): void {
  for (const definition of fields) {
    const field = resolveField(definition, components), input = value[field.name], fieldPath = path + '.' + field.name;
    if (field.required && (input == null || input === '' || (Array.isArray(input) && input.length === 0))) throw new Error(fieldPath + ': required');
    if (input == null || (!field.required && field.type === 'object' && empty(input))) continue;
    if (field.list) {
      if (!Array.isArray(input)) throw new Error(fieldPath + ': expected list');
      const min = field.list.min ?? 0, max = field.list.max ?? Infinity;
      if (input.length < min || input.length > max) throw new Error(fieldPath + ': list bounds');
      input.forEach((item: any, index: number) => {
        if (field.required && empty(item)) throw new Error(fieldPath + '.' + index + ': required');
        if (field.type === 'object' && !empty(item)) validateCmsForm(item, field.fields, components, fieldPath + '.' + index);
      });
    } else if (field.type === 'object') validateCmsForm(input, field.fields, components, fieldPath);
  }
}

function project(value: any, fields: any[], components: any): any {
  return Object.fromEntries(fields.filter(field => value[field.name] !== undefined).map(definition => {
    const field = resolveField(definition, components), input = value[field.name];
    const item = (value: any) => field.type === 'object' && value ? project(value, field.fields, components) : value;
    return [field.name, field.list ? input.map(item) : item(input)];
  }));
}

function merge(original: any, edit: any): any {
  const result = structuredClone(original);
  for (const [key, value] of Object.entries(edit)) {
    result[key] = value && typeof value === 'object' && !Array.isArray(value)
      ? merge(result[key] ?? {}, value) : structuredClone(value);
  }
  return result;
}

function sanitize(value: any): any {
  const empty = (value: any) => value == null || value === '';
  if (Array.isArray(value)) return value.map(sanitize).filter(value => !empty(value));
  if (value && typeof value === 'object') {
    const result = Object.fromEntries(Object.entries(value).map(([key, value]) => [key, sanitize(value)]));
    return Object.fromEntries(Object.entries(result).filter(([, value]) => !empty(value) && !(typeof value === 'object' && Object.keys(value).length === 0)));
  }
  return value;
}

export function cmsJsonSave(original: any, form: any, entry: any, cms: any): string {
  validateCmsForm(form, entry.fields, cms.components);
  const declared = project(form, entry.fields, cms.components);
  const saved = cms.settings.content.merge ? merge(original, declared) : declared;
  return JSON.stringify(sanitize(saved), null, 2);
}

export function entryForFile(cms: any, path: string): any {
  return cms.content.find((entry: any) => entry.type === 'file' ? entry.path === path
    : entry.type === 'collection' && path.startsWith(entry.path + '/') && !(entry.exclude ?? []).includes(path.slice(entry.path.length + 1)));
}
