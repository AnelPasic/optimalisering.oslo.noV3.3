# Native collapsed-label limitation

Official upstream HEAD inspected 2026-10-19: `6f4e860a35d934406580287e7042e5e111e207a1`. The hosted deployed revision is not exposed; its fresh observed behavior matches the inspected implementation.

- [Entry summary code](https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/components/entry/entry-form.tsx#L133) passes item values and the index to interpolation. It does not pass field definitions or select-option labels.
- [Interpolation](https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/lib/schema.ts#L353) reads data paths and converts their stored values to strings. It provides no conditional label lookup, formatter, expression or select-label token.
- [Official list documentation](https://pagescms.org/docs/configuration/content/list/) documents index and current-item field-value tokens. [Select options](https://pagescms.org/docs/configuration/fields/select/) separately define stored names and displayed labels.
- The native fresh authenticated editor actually shows `regneeksempel` collapsed while its expanded select shows `Konverteringskalkulator`: native-before.json and cms-before.jpg. No false claim of label restoration from YAML/schema alone.
- [Entry descriptions](https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/components/entry/entry-form.tsx#L948) render as part of each repeated item, explaining the observed9 copies of the list instruction.

STOP the label subissue under D-104. A hidden/read-only name field would still need a second stored label and synchronization after reference changes. Splitting the existing reference block into eight block types or changing stable select names would rebuild the accepted model. Neither is introduced.

Small supported workaround: retain stable collapsed keys; open the row to use its existing Norwegian picker label and find the matching named original under Globale elementer. Wait for upstream native select-label summary support if distinct friendly collapsed names are required. No manually maintained label registry or custom CMS is proposed.

The separate help fix removes only the three verbose block-list descriptions. Removal/link help stays inside expanded reference rows, and each named master retains its shared-edit explanation. No new saved hint field is needed.
