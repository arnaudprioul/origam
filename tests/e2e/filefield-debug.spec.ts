import { test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-filefield-origamfilefield-story-vue'

test.setTimeout(180_000)

test('DEBUG filefield — locate the label border bug', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText('Single + paperclip', { exact: true }).last().click({ timeout: 10_000 })
    await page.waitForTimeout(1500)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    // First file-field on the default variant
    const fields = await sandbox.locator('.origam-file-field').all()
    // eslint-disable-next-line no-console
    console.log(`total .origam-file-field elements: ${fields.length}`)

    if (fields.length === 0) return

    // Inspect the first field's label rendering — anything with a border
    // around the floating "Document" label is suspicious.
    const info = await fields[0].evaluate((el) => {
        const allDescendants = el.querySelectorAll('*')
        const suspects: Array<Record<string, string>> = []
        allDescendants.forEach((d) => {
            const cs = getComputedStyle(d)
            const hasBorder =
                cs.borderWidth !== '0px' &&
                cs.borderStyle !== 'none' &&
                cs.borderColor !== 'rgba(0, 0, 0, 0)'
            const txt = (d as HTMLElement).innerText?.trim().slice(0, 40)
            if (hasBorder && txt && txt.length < 60) {
                suspects.push({
                    tag: d.tagName,
                    classes: (d.className && typeof d.className === 'string') ? d.className.slice(0, 80) : String(d.className),
                    borderWidth: cs.borderWidth,
                    borderRadius: cs.borderRadius,
                    text: txt,
                })
            }
        })
        return {
            rootClasses: el.className,
            label: (el.querySelector('label, .origam-label') as HTMLElement | null)?.outerHTML?.slice(0, 200) ?? null,
            allWithBorder: suspects.slice(0, 10),
        }
    })

    // eslint-disable-next-line no-console
    console.log('\n=== first file-field ===')
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(info, null, 2))

    await fields[0].screenshot({ path: '/tmp/filefield-default.png' })
    // eslint-disable-next-line no-console
    console.log('screenshot: /tmp/filefield-default.png')
})
