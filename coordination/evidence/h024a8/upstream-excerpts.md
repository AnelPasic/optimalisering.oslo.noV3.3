# Inspected upstream excerpts

Public Pages CMS source revision: 6f4e860a35d934406580287e7042e5e111e207a1
Hosted app revision was not exposed or independently identified.
Only excerpts retained; line numbers refer to immutable upstream files.

## components/entry/entry-form.tsx

https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/components/entry/entry-form.tsx

```text
163: const hasExplicitReadonly = (field: Field) =>
164:   Boolean(field.readonly) &&
165:   !(field as FieldWithReadonlyMeta).__inheritedReadonly;
```

```text
167: const SortableItem = ({
168:   id,
169:   children,
170:   readonly = false,
171: }: {
172:   id: string;
173:   children: React.ReactNode;
174:   readonly?: boolean;
175: }) => {
176:   const {
177:     attributes,
178:     isDragging,
179:     listeners,
180:     setNodeRef,
181:     transform,
182:     transition,
183:   } = useSortable({ id });
184:
185:   const style = {
186:     transform: CSS.Translate.toString(transform),
187:     transition,
188:   };
189:
190:   return (
191:     <div
192:       ref={setNodeRef}
193:       className={cn(
194:         "flex items-center gap-x-1",
195:         isDragging ? "opacity-50 z-50" : "z-10",
196:       )}
197:       style={style}
198:     >
199:       {!readonly && (
200:         <Button
201:           type="button"
202:           variant="ghost"
203:           size="icon-sm"
204:           className="h-auto w-6 self-stretch cursor-move text-muted-foreground hover:text-foreground"
205:           {...attributes}
206:           {...listeners}
207:         >
```

```text
245:   const isReadonly = Boolean(field.readonly);
246:   return (
247:     <SortableItem id={id} readonly={isReadonly}>
248:       <div className="grid gap-6 flex-1">
249:         <SingleField
250:           field={field}
251:           fieldName={`${fieldName}.${index}`}
252:           keyPrefix={id}
253:           renderFields={renderFields}
254:           registerBeforeSubmitHook={registerBeforeSubmitHook}
255:           showLabel={false}
256:           isOpen={isOpen ?? defaultOpen}
257:           toggleOpen={() => onToggleOpen(index)}
258:           index={index}
259:         />
260:       </div>
261:       {!isReadonly && (
262:         <Tooltip>
263:           <AlertDialog
264:             open={isPendingRemove}
265:             onOpenChange={(open) => onPendingRemoveChange(index, open)}
266:           >
267:             <TooltipTrigger asChild>
268:               <AlertDialogTrigger asChild>
269:                 <Button
270:                   type="button"
271:                   variant="ghost"
272:                   size="icon"
273:                   className="text-muted-foreground hover:text-foreground self-start"
274:                   onClick={() => onRequestRemove(index)}
275:                 >
276:                   <Trash2 />
277:                 </Button>
278:               </AlertDialogTrigger>
279:             </TooltipTrigger>
280:             <AlertDialogContent>
281:               <AlertDialogHeader>
282:                 <AlertDialogTitle>Remove this item?</AlertDialogTitle>
283:                 <AlertDialogDescription>
284:                   This action cannot be undone.
285:                 </AlertDialogDescription>
286:               </AlertDialogHeader>
287:               <AlertDialogFooter>
288:                 <AlertDialogCancel>Cancel</AlertDialogCancel>
289:                 <AlertDialogAction onClick={() => onRemoveConfirm(index)}>
290:                   Remove
291:                 </AlertDialogAction>
292:               </AlertDialogFooter>
293:             </AlertDialogContent>
294:           </AlertDialog>
295:           <TooltipContent>Remove item</TooltipContent>
296:         </Tooltip>
297:       )}
```

```text
333:     fields: arrayFields,
334:     append,
335:     remove,
336:     move,
337:   } = useFieldArray({
338:     name: fieldName,
339:   });
340:   const [openStates, setOpenStates] = useState<boolean[]>([]);
341:   const shouldShowListHeader =
342:     field.label !== false ||
343:     field.required ||
344:     (isCollapsible && arrayFields.length > 0);
345:   const isReadonly = Boolean(field.readonly);
```

```text
372:
373:   const handleDragEnd = async (event: DragEndEvent) => {
374:     if (isReadonly) return;
375:     const { active, over } = event;
376:     if (!over || active.id === over.id) return;
377:
378:     const oldIndex = arrayFields.findIndex((item) => item.id === active.id);
379:     const newIndex = arrayFields.findIndex((item) => item.id === over.id);
380:
381:     if (oldIndex < 0 || newIndex < 0) return;
382:
383:     await runBeforeSubmitHooks?.();
384:     setOpenStates((prev) => arrayMove(prev, oldIndex, newIndex));
385:     move(oldIndex, newIndex);
386:   };
387:
388:   const addItem = async () => {
389:     if (isReadonly) return;
390:     await runBeforeSubmitHooks?.();
391:     append(
392:       field.type === "object"
393:         ? initializeState(field.fields, {})
394:         : getDefaultValue(field),
395:     );
396:     setOpenStates((prev) => [...prev, true]);
397:   };
398:
399:   const removeItem = useCallback(
400:     async (index: number) => {
401:       if (isReadonly) return;
402:       await runBeforeSubmitHooks?.();
403:       remove(index);
404:       setOpenStates((prev) =>
405:         prev.filter((_, currentIndex) => currentIndex !== index),
406:       );
407:     },
408:     [isReadonly, remove, runBeforeSubmitHooks],
```

```text
514:               <SortableContext
515:                 items={sortableItems}
516:                 strategy={verticalListSortingStrategy}
517:               >
518:                 {arrayFields.map((arrayField, index) => (
519:                   <ListItemRow
520:                     key={arrayField.id}
521:                     id={arrayField.id}
522:                     field={field}
523:                     fieldName={fieldName}
524:                     index={index}
525:                     isOpen={openStates[index]}
526:                     defaultOpen={defaultOpen}
527:                     isPendingRemove={pendingRemoveIndex === index}
528:                     renderFields={renderFields}
529:                     registerBeforeSubmitHook={registerBeforeSubmitHook}
530:                     onToggleOpen={handleToggleOpen}
531:                     onRequestRemove={handleRequestRemove}
532:                     onRemoveConfirm={handleRemoveConfirm}
533:                     onPendingRemoveChange={handlePendingRemoveChange}
534:                   />
535:                 ))}
536:               </SortableContext>
537:             </DndContext>
538:             <div className="flex items-center gap-2 flex-wrap">
539:               {isReadonly ? null : typeof field.list === "object" &&
540:                 field.list?.max &&
541:                 arrayFields.length >= field.list.max ? null : (
542:                 <Button
543:                   type="button"
544:                   variant="outline"
545:                   size="sm"
546:                   onClick={addItem}
547:                 >
548:                   <Plus />
549:                   Add an item
550:                 </Button>
551:               )}
```

```text
594:     const { blocks = [] } = field;
595:     const blockKey = field.blockKey || "_block";
596:     const selectedBlockName = value?.[blockKey];
597:     const [isRemoveBlockDialogOpen, setIsRemoveBlockDialogOpen] =
598:       useState(false);
599:     const isReadonly = Boolean(field.readonly);
600:
601:     const handleBlockSelect = (blockName: string) => {
602:       if (isReadonly) return;
603:       const selectedBlockDef = blocks.find((b: Field) => b.name === blockName);
604:       if (!selectedBlockDef) return;
605:       let initialState: Record<string, unknown> = { [blockKey]: blockName };
606:       if (selectedBlockDef.fields) {
607:         const choiceDefaults = initializeState(selectedBlockDef.fields, {});
608:         initialState = { ...initialState, ...choiceDefaults };
609:       }
610:       onChange(initialState);
611:     };
612:
613:     const handleRemoveBlock = () => {
614:       if (isReadonly) return;
615:       onChange(null);
616:     };
617:
618:     const selectedBlockDefinition = useMemo(() => {
619:       const definition = blocks.find(
620:         (b: Field) => b.name === selectedBlockName,
621:       );
622:       return definition;
623:     }, [blocks, selectedBlockName]);
624:
625:     const itemLabel = getCollapsibleItemLabel(field, value, index);
626:
627:     return (
628:       <div className="space-y-3" ref={ref as React.Ref<HTMLDivElement>}>
629:         {!selectedBlockDefinition ? (
630:           <div className="rounded-lg border p-4 space-y-4">
631:             <div className="text-sm">Choose content block:</div>
632:             <div className="flex flex-wrap gap-2">
633:               {blocks.map((blockDef: Field) => (
634:                 <Button
635:                   key={blockDef.name}
636:                   type="button"
637:                   variant="outline"
638:                   size="sm"
639:                   className="gap-x-2"
640:                   onClick={() => handleBlockSelect(blockDef.name)}
641:                   disabled={isReadonly}
642:                 >
643:                   {blockDef.label || blockDef.name}
```

```text
679:               >
680:                 {selectedBlockDefinition.label || selectedBlockDefinition.name}
681:
682:                 {!isReadonly && (
683:                   <Tooltip>
684:                     <AlertDialog
685:                       open={isRemoveBlockDialogOpen}
686:                       onOpenChange={setIsRemoveBlockDialogOpen}
687:                     >
688:                       <TooltipTrigger asChild>
689:                         <AlertDialogTrigger asChild>
690:                           <button
691:                             type="button"
692:                             onClick={(event) => {
693:                               event.stopPropagation();
694:                               setIsRemoveBlockDialogOpen(true);
695:                             }}
696:                             className="text-muted-foreground hover:text-foreground -my-0.5 -mx-2 px-2 transition-colors"
697:                           >
698:                             <X className="size-3" />
699:                           </button>
700:                         </AlertDialogTrigger>
701:                       </TooltipTrigger>
702:                       <AlertDialogContent
703:                         onClick={(event) => event.stopPropagation()}
704:                       >
705:                         <AlertDialogHeader>
706:                           <AlertDialogTitle>
707:                             Remove this block?
708:                           </AlertDialogTitle>
709:                           <AlertDialogDescription>
710:                             This action cannot be undone.
711:                           </AlertDialogDescription>
712:                         </AlertDialogHeader>
713:                         <AlertDialogFooter>
714:                           <AlertDialogCancel>Cancel</AlertDialogCancel>
715:                           <AlertDialogAction
716:                             onClick={() => {
717:                               handleRemoveBlock();
718:                               setIsRemoveBlockDialogOpen(false);
719:                             }}
720:                           >
721:                             Remove
722:                           </AlertDialogAction>
723:                         </AlertDialogFooter>
724:                       </AlertDialogContent>
725:                     </AlertDialog>
726:                     <TooltipContent>Remove block</TooltipContent>
727:                   </Tooltip>
728:                 )}
729:               </Badge>
730:             </header>
731:             <div
```

## lib/config-schema.ts

https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/lib/config-schema.ts

```text
241: const ListSchema = z.union([
242:   z.boolean(),
243:   z
244:     .object(
245:       {
246:         min: z
247:           .number()
248:           .min(0, "'min' must be a positive integer (minimum 0).")
249:           .optional(),
250:         max: z
251:           .number()
252:           .min(1, "'max' must be a positive integer (minimum 1).")
253:           .optional(),
254:         collapsible: z.union([
255:           z.boolean(),
256:           z.object(
257:             {
258:               collapsed: z.boolean().optional(),
259:               summary: z.string().optional(),
260:             },
261:             {
262:               message:
263:                 "'collapsible' must be either a boolean or an object with 'collapsed' and 'summary' properties.",
264:             },
265:           ),
266:         ]),
267:       },
268:       {
269:         message:
270:           "'list' must be either a boolean or an object with 'min' and 'max' properties.",
271:       },
272:     )
273:     .strict(),
274: ]);
275:
```

```text
391:         list: ListSchema.optional(),
392:         hidden: z
393:           .boolean({
394:             message: "'hidden' must be a boolean.",
395:           })
396:           .optional()
397:           .nullable(),
398:         readonly: z
399:           .boolean({
400:             message: "'readonly' must be a boolean.",
401:           })
402:           .optional()
```

```text
437:         blocks: z
438:           .array(
439:             z.lazy(() => generateFieldObjectSchema(false, true)),
440:             { message: "'blocks' must be an array of field definitions." },
441:           )
442:           .optional(),
443:         blockKey: z
444:           .string({
445:             message: "'blockKey' must be a string.",
446:           })
447:           .min(1, {
448:             message: "'blockKey' cannot be empty.",
449:           })
```

```text
533:         required_error: "'path' is required.",
534:         invalid_type_error: "'path' must be a string.",
535:       })
536:       .regex(/^[^/].*[^/]$|^$/, {
537:         message:
538:           "'path' must be a valid relative path (no leading or trailing slash).",
539:       }),
540:     operations: ContentOperationsSchema.optional(),
541:     filename: FilenameConfigSchema.optional().nullable(),
```

## fields/custom/README.md

https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/fields/custom/README.md

```text
1: Use this folder to add custom fields.
2:
3: Custom field names should be unique, unless you want to override a core field.
4:
5: Each field folder should include an `index.ts` or `index.tsx` file that can export:
6:
7: - `schema`: a [Zod schema](https://zod.dev/) used to process the field when saving. This is used for validation and format coertion.
8: - `read`: a function used to convert the field value when reading from a file (e.g. `fields/core/date` will convert from the `format` defined for that date field to a standard ISO 8601 date/datetime).
9: - `write`: a function used to convert the field value when writing to a file (e.g. `fields/core/date` will convert from a standard ISO 8601 date/datetime to the `format` defined for that date field).
10: - `EditComponent`: a React component used to edit the field.
11: - `ViewComponent`: a React component used to display the field in a collection.
12: - `defaultValue`: defines the default value for the field.
```

## fields/registry.ts

https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/fields/registry.ts

```text
1: import { Field } from "@/types/field";
2: import { z } from "zod";
3: import * as booleanField from "@/fields/core/boolean";
4: import * as codeField from "@/fields/core/code";
5: import * as dateField from "@/fields/core/date";
6: import * as fileField from "@/fields/core/file";
7: import * as imageField from "@/fields/core/image";
8: import * as numberField from "@/fields/core/number";
9: import * as referenceField from "@/fields/core/reference";
10: import * as richTextField from "@/fields/core/rich-text";
11: import * as selectField from "@/fields/core/select";
12: import * as stringField from "@/fields/core/string";
13: import * as textField from "@/fields/core/text";
14: import * as uuidField from "@/fields/core/uuid";
15:
16: type FieldModule = {
17:   label?: string;
18:   schema?: (...args: any[]) => z.ZodTypeAny;
19:   defaultValue?: any;
20:   read?: (...args: any[]) => any;
21:   write?: (...args: any[]) => any;
22:   EditComponent?: React.ComponentType<any>;
```

```text
58: registerField("uuid", uuidField);
59:
60: export { labels, schemas, readFns, writeFns, defaultValues, editComponents, viewComponents, fieldTypes };
```
