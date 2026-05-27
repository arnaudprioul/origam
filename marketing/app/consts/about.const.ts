import type { IAboutStat, IAboutPrinciple, IAboutStackItem, IAboutLink } from '~/interfaces/about.interface'

export const ABOUT_GITHUB_BASE = 'https://github.com/arnaudprioul/origam' as const
export const ABOUT_NPM_URL = 'https://www.npmjs.com/package/origam' as const
export const ABOUT_CONTACT_EMAIL = 'arnaud.prioul@gmail.com' as const

export const ABOUT_STATS: ReadonlyArray<IAboutStat> = [
    {
        label: 'Components',
        value: '95+',
        icon: 'mdi:puzzle-outline'
    },
    {
        label: 'Chart primitives',
        value: 29,
        icon: 'mdi:chart-bar'
    },
    {
        label: 'TypeScript coverage',
        value: '100%',
        icon: 'mdi:code-brackets'
    },
    {
        label: 'License',
        value: 'MIT',
        icon: 'mdi:open-source-initiative'
    }
] as const

export const ABOUT_PRINCIPLES: ReadonlyArray<IAboutPrinciple> = [
    {
        title: 'CSS-first',
        body: 'Container queries, :has(), color-mix(), clamp() — modern CSS is used first. JavaScript is a fallback gated behind useCssSupport(), never the default path.',
        icon: 'mdi:feather'
    },
    {
        title: 'Eat your own dog food',
        body: 'origam.dev is built with origam. Every friction point in the consumer API surfaces immediately. There is no comfortable distance between author and user.',
        icon: 'mdi:silverware-fork-knife'
    },
    {
        title: 'Production-ready',
        body: 'Every component ships with Playwright specs and an axe-core a11y suite. Flaky tests are bugs. A component without a green CI badge is not done.',
        icon: 'mdi:shield-check-outline'
    },
    {
        title: 'Open source, MIT',
        body: 'Free to use commercially, fork, and redistribute. The npm package, token sources, and docs are all public. No tiers, no paywalls, no hidden SDK.',
        icon: 'mdi:open-source-initiative'
    },
    {
        title: 'No bullshit',
        body: 'No magic, no hidden overrides. Every CSS variable is named, every composable is tested, every behaviour is documented. When something breaks, the stack trace points you there.',
        icon: 'mdi:bullseye-arrow'
    }
] as const

export const ABOUT_STACK: ReadonlyArray<IAboutStackItem> = [
    {
        name: 'Tokens Studio',
        url: 'https://tokens.studio',
        role: 'Design token source (DTCG JSON)',
        icon: 'mdi:palette-swatch-outline'
    },
    {
        name: 'Style Dictionary v4',
        url: 'https://amzn.github.io/style-dictionary',
        role: 'Token compiler → CSS, SCSS, TypeScript',
        icon: 'mdi:cog-outline'
    },
    {
        name: 'Vue 3',
        url: 'https://vuejs.org',
        role: 'Component framework (Composition API, SFC)',
        icon: 'mdi:vuejs'
    },
    {
        name: 'TypeScript',
        url: 'https://www.typescriptlang.org',
        role: 'Strict types end-to-end',
        icon: 'mdi:language-typescript'
    },
    {
        name: 'Histoire',
        url: 'https://histoire.dev',
        role: 'Interactive component stories',
        icon: 'mdi:book-open-page-variant-outline'
    },
    {
        name: 'VitePress',
        url: 'https://vitepress.dev',
        role: 'Reference documentation site',
        icon: 'mdi:file-document-outline'
    },
    {
        name: 'unbuild',
        url: 'https://github.com/unjs/unbuild',
        role: 'Library bundler (ES module output)',
        icon: 'mdi:package-variant-closed'
    },
    {
        name: 'Vitest',
        url: 'https://vitest.dev',
        role: 'Unit and composable tests',
        icon: 'mdi:test-tube'
    },
    {
        name: 'Playwright + axe-core',
        url: 'https://playwright.dev',
        role: 'E2E and accessibility tests',
        icon: 'mdi:drama-masks'
    },
    {
        name: 'Tauri 2',
        url: 'https://tauri.app',
        role: 'Desktop shell for local dev',
        icon: 'mdi:desktop-classic'
    },
    {
        name: 'Nuxt 4',
        url: 'https://nuxt.com',
        role: 'SSR framework powering origam.dev',
        icon: 'mdi:layers-outline'
    },
    {
        name: 'Coolify',
        url: 'https://coolify.io',
        role: 'Self-hosted deployment platform',
        icon: 'mdi:server-outline'
    }
] as const

export const ABOUT_LINKS: ReadonlyArray<IAboutLink> = [
    {
        label: 'GitHub repository',
        url: ABOUT_GITHUB_BASE,
        icon: 'mdi:github'
    },
    {
        label: 'Open an issue',
        url: `${ABOUT_GITHUB_BASE}/issues`,
        icon: 'mdi:alert-circle-outline'
    },
    {
        label: 'GitHub Discussions',
        url: `${ABOUT_GITHUB_BASE}/discussions`,
        icon: 'mdi:forum-outline'
    },
    {
        label: 'npm package',
        url: ABOUT_NPM_URL,
        icon: 'mdi:npm'
    }
] as const
