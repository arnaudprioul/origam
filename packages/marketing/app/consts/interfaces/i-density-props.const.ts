import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DENSITY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-density-props',
    name: 'IDensityProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_density_props.description',
    descriptionFallback: 'Density contract — controls vertical compactness of components that support multiple sizes (default, comfortable, compact). Consumed by useDensity().',
    definition: `export interface IDensityProps {
    density?: TDensity
}`,
    extends: [],
    props: [
        { name: 'density', type: 'TDensity', optional: true, descriptionFallback: 'Vertical size variant — "default" (full), "comfortable" (reduced), or "compact" (minimal). Consumed via useDensity() to emit the matching CSS class.' },
    ],
    usedBy: [
        { slug: 'tabs', name: 'Tabs', kind: 'component' },
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'drawer', name: 'Drawer', kind: 'component' },
        { slug: 'title', name: 'Title', kind: 'component' },
        { slug: 'pagination', name: 'Pagination', kind: 'component' },
        { slug: 'use-density', name: 'useDensity', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/density.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_density_props.example',
            titleFallback: 'Extending IDensityProps and consuming useDensity',
            code: `import type { IDensityProps } from 'origam'
import { useDensity } from 'origam'

interface IMyProps extends IDensityProps {}

const props = defineProps<IMyProps>()
const { densityClasses } = useDensity(props)`,
            lang: 'typescript',
        },
    ],
}
