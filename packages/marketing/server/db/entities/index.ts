/**
 * entities/index.ts — barrel for the API-Reference TypeORM entities.
 *
 * `ENTITIES` is the single ordered list consumed by the DataSource (runtime,
 * migration CLI and ingestion pipeline). The named re-exports let the pipeline
 * and the API import a specific entity class directly.
 */

export { DocRowBase } from './base.entity'
export { DocEntry } from './doc-entry.entity'
export { DocProp } from './doc-prop.entity'
export { DocValue } from './doc-value.entity'
export { DocParam } from './doc-param.entity'
export { DocReturn } from './doc-return.entity'
export { DocEmit } from './doc-emit.entity'
export { DocSlot } from './doc-slot.entity'
export { DocExample } from './doc-example.entity'
export { DocDirectiveArg } from './doc-directive-arg.entity'
export { DocDirectiveModifier } from './doc-directive-modifier.entity'
export { DocRelation } from './doc-relation.entity'
export { DocCategory } from './doc-category.entity'
export { DocSyncRun } from './doc-sync-run.entity'
export { DocMeta } from './doc-meta.entity'
export { Theme } from './theme.entity'

import { DocEntry } from './doc-entry.entity'
import { DocProp } from './doc-prop.entity'
import { DocValue } from './doc-value.entity'
import { DocParam } from './doc-param.entity'
import { DocReturn } from './doc-return.entity'
import { DocEmit } from './doc-emit.entity'
import { DocSlot } from './doc-slot.entity'
import { DocExample } from './doc-example.entity'
import { DocDirectiveArg } from './doc-directive-arg.entity'
import { DocDirectiveModifier } from './doc-directive-modifier.entity'
import { DocRelation } from './doc-relation.entity'
import { DocCategory } from './doc-category.entity'
import { DocSyncRun } from './doc-sync-run.entity'
import { DocMeta } from './doc-meta.entity'
import { Theme } from './theme.entity'

export const ENTITIES = [
    DocEntry, DocProp, DocValue, DocParam, DocReturn, DocEmit, DocSlot,
    DocExample, DocDirectiveArg, DocDirectiveModifier, DocRelation,
    DocCategory, DocSyncRun, DocMeta, Theme,
]
