import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
	{ ignores: ['*.d.ts', '**/coverage', '**/dist', '**/.history', '**/node_modules', '**/stories'] },
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
			"vue/no-template-shadow": ["warn", { "allow": ["props"] }],
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
