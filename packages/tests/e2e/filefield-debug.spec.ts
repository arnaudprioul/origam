import { test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-filefield-origamfilefield-story-vue'

test.setTimeout(180_000)

test('DEBUG filefield — locate the label border bug', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText('Single + paperclip', { exact: true }).last().click({ timeout: 10_000 })
    await page.waitForTimeout(1500)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    // First file-field on the default variant
    const fields = await sandbox.locator('.origam-file-field').all()
     
    console.log(`total .origam-file-field elements: ${fields.length}`)

    if (fields.length === 0) return

    // Focus the input so the floating label appears in its lifted /
    // focused state — that's where the previous fix didn't apply.
    await sandbox.locator('.origam-file-field input').first().focus()
    await page.waitForTimeout(300)

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
        const labels = Array.from(el.querySelectorAll('label, .origam-label')) as HTMLElement[]
        return {
            rootClasses: el.className,
            labelCount: labels.length,
            labels: labels.map((l) => ({
                cls: l.className,
                isFloating: l.classList.contains('origam-field__label--floating'),
                borderWidth: getComputedStyle(l).borderWidth,
                borderRadius: getComputedStyle(l).borderRadius,
                text: l.innerText?.trim().slice(0, 40),
            })),
            allWithBorder: suspects.slice(0, 10),
        }
    })

     
    console.log('\n=== first file-field ===')
     
    console.log(JSON.stringify(info, null, 2))

    await fields[0].screenshot({ path: '/tmp/filefield-default.png' })
     
    console.log('screenshot: /tmp/filefield-default.png')
})
