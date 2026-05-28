import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
	{
		ignores: [
			'*.d.ts',
			'**/coverage',
			'**/dist',
			'**/.history',
			'**/node_modules',
			'**/stories',
			// `.claude/worktrees/<agent>/` are stale git worktree copies
			// from earlier agent runs (`isolation: "worktree"`). They
			// contain duplicates of files we already lint at the repo
			// root — including the figma-plugin TSX/JSX which needs its
			// own parser config (cf. figma-plugin/** ignore below).
			// Linting them produces ~200 parse errors that block every
			// commit while having no semantic value (after merge the
			// worktree dir is just leftover scaffolding).
			'.claude/worktrees/**',
			// `.nuxt/` is Nuxt's build-time scratch dir. It contains
			// generated `.d.ts` files (components, runtime-config,
			// nitro-config, etc.) with broad utility types (`{}` empty
			// object, triple-slash references, …) that don't pass our
			// strict lint config. They are regenerated on every Nuxt
			// build and never authored — exclude them. The leading `.`
			// makes the global `*.d.ts` pattern miss them on some
			// glob implementations, hence the explicit listing.
			'**/.nuxt/**',
			'.output/**',
			'**/.output/**',
			// VitePress generates JS cache files under docs/.vitepress/cache/deps
			// that re-emit deprecated rule names (`es5/no-es6-methods`,
			// `@typescript-eslint/no-explicit-any` as ESLint v8 rule strings).
			// They are pre-built deps — never linted source. Ignore the whole
			// cache tree.
			'docs/.vitepress/cache/**',
			'docs/.vitepress/dist/**',
			// The Figma plugin ships its own TSX/JSX UI that requires a
			// separate parser config (it's NOT part of the published origam
			// library and has its own lifecycle). Excluded from the lib
			// lint to keep `package origam` cleanly typed.
			'figma-plugin/**',
			'packages/figma-plugin/**',
		],
	},
	{
		extends: [
			eslint.configs.recommended,
			...typescriptEslint.configs.recommended,
			...eslintPluginVue.configs['flat/recommended'],
		],
		files: ['**/*.{ts,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: {
				parser: typescriptEslint.parser,
			},
		},
		rules: {
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/ban-ts-comment": "warn",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-object-type": ["error", {
				"allowInterfaces": "with-single-extends"
			}],
			"vue/valid-v-slot": "off",
			// Slot scopes in origam intentionally re-expose internal names
			// already declared in the parent `<script setup>` (id from
			// `useId()` shadowed by the resolved id surfaced by origam-input,
			// model from the parent v-model shadowed by the slot's
			// transformed model, etc). Renaming would break the slot API
			// readability, so the canonical names are whitelisted.
			"vue/no-template-shadow": ["warn", { "allow": ["props", "id", "model", "ref", "max", "isActive", "isSelected"] }],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"args": "all",
					"argsIgnorePattern": "^_",
					"caughtErrors": "all",
					"caughtErrorsIgnorePattern": "^_",
					"destructuredArrayIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"ignoreRestSiblings": true
				}
			]
		},
	},
	{
		files: ['**/*.spec.ts', '**/*.spec.js', '**/*.cy.ts', '**/*.test.ts'],
		rules: {
			"@typescript-eslint/no-unused-vars": "warn"
		}
	},
	{
		// Nuxt page components use file-based routing: the file name IS
		// the route (`pages/index.vue` → `/`, `pages/about.vue` →
		// `/about`). Nuxt forbids multi-word file names for routes — so
		// the Vue rule that requires multi-word *component* names
		// doesn't apply here. Demote to off for the marketing pages.
		files: ['packages/marketing/app/pages/**/*.vue'],
		rules: {
			"vue/multi-word-component-names": "off"
		}
	},
	{
		files: ['src/**/*.{ts,vue}'],
		rules: {
			"no-restricted-imports": ["error", {
				patterns: [
					{
						group: ["@origam", "@origam/*"],
						message: "Do NOT use the @origam alias inside src/. mkdist keeps imports verbatim — once published, '@origam/*' cannot be resolved by consumers and the lib breaks at runtime. Use a relative path ('../../components', '../utils', ...) instead. The alias is allowed in stories/ and docs/ only."
					},
					{
						group: ["@stories", "@stories/*", "@docs", "@docs/*", "@cypress", "@cypress/*"],
						message: "Aliases pointing to non-src directories must never be reached from src/. They only exist for dev tooling (Histoire, VitePress, Cypress) and would leak external paths into the published bundle."
					}
				]
			}]
		}
	},
	eslintConfigPrettier
);
