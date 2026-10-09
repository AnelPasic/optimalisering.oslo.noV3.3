// JSON-only Pages-CMS-equivalent fixture, not an authenticated save.
// Verified against pages-cms/pages-cms 6f4e860a35d934406580287e7042e5e111e207a1:
// files/[path]/route.ts validates declared fields, merges objects, replaces arrays,
// sanitizes empty values, and serializes JSON with two-space indentation.
export function resolveField(field: any, components: any): any {
  return field.component ? { ...components[field.component], ...field } : field;
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
  const declared = project(form, entry.fields, cms.components);
  const saved = cms.settings.content.merge ? merge(original, declared) : declared;
  return JSON.stringify(sanitize(saved), null, 2);
}

export function entryForFile(cms: any, path: string): any {
  return cms.content.find((entry: any) => entry.type === 'file' ? entry.path === path
    : entry.type === 'collection' && path.startsWith(entry.path + '/') && !(entry.exclude ?? []).includes(path.slice(entry.path.length + 1)));
}
