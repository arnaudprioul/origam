import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/*
 * Component-level a11y sweep.
 *
 * Drives Histoire (the Storybook equivalent the project uses) and
 * runs axe-core against the Default Variant of every component
 * that has a story. Each component is a separate test so the report
 * tells you exactly which one introduced a regression.
 *
 * Failures are limited to violations of impact `serious` and
 * `critical` — minor / moderate ones surface in the HTML report as
 * warnings but don't fail CI. Adjust per `IMPACT_FAIL_LEVEL` below.
 *
 * Prerequisite: `npm run story:dev` running on http://localhost:6006
 * before invoking `npm run test:a11y`. The Playwright config doesn't
 * spawn Histoire itself because Histoire's startup time (~15s) is
 * too slow for the per-test webServer pattern.
 */

const HISTOIRE_BASE_URL = process.env.HISTOIRE_BASE_URL ?? 'http://localhost:6006'
const IMPACT_FAIL_LEVEL: Array<'serious' | 'critical'> = ['serious', 'critical']

/*
 * Components to sweep, addressed by their Histoire story slug.
 * The slug pattern is `stories-components-stories-<name>-origam<name>-story-vue`.
 *
 * Add new components here as they land. The list is deliberately
 * explicit (not auto-discovered) so the sweep is reviewable and
 * a new untested component doesn't silently disappear from the
 * smoke pass.
 */
const COMPONENT_STORIES: Array<{ name: string; slug: string }> = [
    { name: 'Alert',           slug: 'alert-origamalert' },
    { name: 'Avatar',          slug: 'avatar-origamavatar' },
    { name: 'Badge',           slug: 'badge-origambadge' },
    { name: 'Breadcrumb',      slug: 'breadcrumb-origambreadcrumb' },
    { name: 'Btn',             slug: 'btn-origambtn' },
    { name: 'Card',            slug: 'card-origamcard' },
    { name: 'Checkbox',        slug: 'checkbox-origamcheckbox' },
    { name: 'Chip',            slug: 'chip-origamchip' },
    { name: 'Dialog',          slug: 'dialog-origamdialog' },
    { name: 'Drawer',          slug: 'drawer-origamdrawer' },
    { name: 'Field',           slug: 'field-origamfield' },
    { name: 'Form',            slug: 'form-origamform' },
    { name: 'Input',           slug: 'input-origaminput' },
    { name: 'Label',           slug: 'label-origamlabel' },
    { name: 'Menu',            slug: 'menu-origammenu' },
    { name: 'Pagination',      slug: 'pagination-origampagination' },
    { name: 'Progress',        slug: 'progress-origamprogress' },
    { name: 'Radio',           slug: 'radio-origamradio' },
    { name: 'Select',          slug: 'select-origamselect' },
    { name: 'Sheet',           slug: 'sheet-origamsheet' },
    { name: 'Snackbar',        slug: 'snackbar-origamsnackbar' },
    { name: 'Stepper',         slug: 'stepper-origamstepper' },
    { name: 'Switch',          slug: 'switch-origamswitch' },
    { name: 'TextField',       slug: 'textfield-origamtextfield' },
    { name: 'Tooltip',         slug: 'tooltip-origamtooltip' },
    { name: 'Tabs',            slug: 'tabs-origamtabs' },
    { name: 'Treeview',        slug: 'treeview-origamtreeview' },
    { name: 'Chart',           slug: 'chart-origamchart' }
]

async function runAxeOn(page: Page, storySlug: string) {
    const url = `${HISTOIRE_BASE_URL}/story/stories-components-stories-${storySlug}-story-vue?variantId=stories-components-stories-${storySlug}-story-vue-0`
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 })
    await page.waitForTimeout(2500)

    /*
     * The Variant content renders inside an iframe; axe needs the
     * iframe context so we target it explicitly. The default Variant
     * iframe has `name="sandbox"` — fall back to the first frame.
     */
    const frames = page.frames().filter((f) => f.url().includes('/__sandbox'))
    const target = frames[0] ?? page.mainFrame()

    const results = await new AxeBuilder({ page })
        .include(target.url() === page.url() ? 'body' : '')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze()

    const blocking = results.violations.filter((v) => IMPACT_FAIL_LEVEL.includes(v.impact as any))
    return { blocking, all: results.violations }
}

for (const { name, slug } of COMPONENT_STORIES) {
    test(`a11y — ${name} Default Variant`, async ({ page }) => {
        const { blocking, all } = await runAxeOn(page, slug)
        if (all.length > 0) {
            // eslint-disable-next-line no-console
            console.log(`[a11y] ${name}: ${all.length} total violation(s), ${blocking.length} blocking`)
            for (const v of blocking) {
                // eslint-disable-next-line no-console
                console.log(`  ✗ ${v.id} (${v.impact}): ${v.help}`)
            }
        }
        expect(blocking, `${name} has ${blocking.length} serious/critical a11y violation(s)`).toHaveLength(0)
    })
}
