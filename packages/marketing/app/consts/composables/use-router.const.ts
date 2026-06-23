import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ROUTER_DOC: IComposableDoc = {
    slug: 'use-router',
    name: 'useRouter',
    domain: 'Commons',
    icon: 'mdi-routes',
    descriptionKey: '',
    descriptionFallback: 'Thin wrappers around Vue Router that expose the current route and router instance from the Vue component instance rather than via direct vue-router import. Also provides useLink (a link-resolution helper used by all clickable Origam components) and useBackButton (navigation guard for hardware/browser back button interception).',
    signature: `// Returns the active route as a reactive ref
function useRoute(): Ref<RouteLocationNormalizedLoaded | undefined>

// Returns the Router instance (undefined when vue-router is not installed)
function useRouter(): Router | undefined

// Resolves tag, isLink, isClickable, href, route, navigate, isActive
function useLink(
  props: ILinkProps & ITagProps,
  attrs: SetupContext['attrs']
): ILink

// Intercepts the hardware/browser back button with a guard
function useBackButton(
  router: Router | undefined,
  cb: (next: NavigationGuardNext) => void
): void`,
    params: [
        {
            name: 'props (useLink)',
            type: 'ILinkProps & ITagProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props containing `href` (external link), `to` (vue-router location), `tag` (root element override), and `exact` (exact-active matching).',
        },
        {
            name: 'attrs (useLink)',
            type: "SetupContext['attrs']",
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The component attrs used to detect a click listener, which makes a non-link element behave as clickable.',
        },
        {
            name: 'router (useBackButton)',
            type: 'Router | undefined',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The Router instance. When undefined (no vue-router), only the popstate listener is registered.',
        },
        {
            name: 'cb (useBackButton)',
            type: '(next: NavigationGuardNext) => void',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Guard callback called when a popstate (back) event is detected. Must call next() to allow navigation or next(false) to cancel.',
        },
    ],
    returns: [
        {
            name: 'tag (useLink)',
            type: 'string',
            descriptionKey: '',
            descriptionFallback: '"a" when href or to is present, otherwise the tag prop or "div".',
        },
        {
            name: 'isLink (useLink)',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when props.href or props.to is set.',
        },
        {
            name: 'isClickable (useLink)',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when isLink or a click listener is present in props/attrs.',
        },
        {
            name: 'isActive (useLink)',
            type: 'ComputedRef<boolean | undefined>',
            descriptionKey: '',
            descriptionFallback: 'True when the resolved route matches the current location (honours exact prop).',
        },
        {
            name: 'href (useLink)',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The resolved href — either props.href (external) or the vue-router resolved route href.',
        },
        {
            name: 'navigate (useLink)',
            type: '((e?: MouseEvent) => Promise<void>) | undefined',
            descriptionKey: '',
            descriptionFallback: 'RouterLink.navigate function for programmatic navigation. Undefined when using a plain href.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Read the current route',
            code: `<script setup lang="ts">
import { useRoute } from 'origam'

const route = useRoute()
</script>

<template>
  <p>Current path: {{ route?.path }}</p>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Origam button as router-link',
            code: `<!-- Origam components resolve links via useLink internally -->
<origam-btn :to="{ name: 'dashboard' }" color="primary">
  Go to Dashboard
</origam-btn>

<!-- External href -->
<origam-btn href="https://origam.dev" target="_blank">
  Visit docs
</origam-btn>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Back button guard (Dialog)',
            code: `<script setup lang="ts">
import { useRouter as useVueRouter } from 'vue-router'
import { useBackButton } from 'origam'

const router = useVueRouter()
const isOpen = defineModel<boolean>()

useBackButton(router, (next) => {
  if (isOpen.value) {
    isOpen.value = false
    next(false)
  } else {
    next()
  }
})
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-go-to', 'use-hotkey'],
    consumedInterfaces: ['ILinkProps', 'ITagProps', 'ILink'],
}
