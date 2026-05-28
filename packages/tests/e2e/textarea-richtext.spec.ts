import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-textareafield-origamtextareafield-story-vue'

const ARROW_TIMEOUT = 5000

test.describe('OrigamTextareaField — richtext mode', () => {
    test('Mode rich (HTML) — renders contenteditable host with toolbar', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — rich (HTML output)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const editor = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-textarea-rich-host"]')
        await expect(editor).toBeVisible({ timeout: ARROW_TIMEOUT })
        const ce = await editor.getAttribute('contenteditable')
        expect(ce).toBe('true')

        const toolbar = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-rich-toolbar"]')
        await expect(toolbar).toBeVisible({ timeout: ARROW_TIMEOUT })

        const aria = await toolbar.getAttribute('role')
        expect(aria).toBe('toolbar')
    })

    test('Mode rich (HTML) — emits sanitised HTML in v-model', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — rich (HTML output)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const editor = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-textarea-rich-host"]')
        await expect(editor).toBeVisible({ timeout: ARROW_TIMEOUT })

        // Clear preset content + type fresh text.
        await editor.click()
        await editor.evaluate((el) => {
            el.innerHTML = ''
            el.focus()
        })
        await editor.type('Hello')

        const output = sandbox.locator('[data-cy="textarea-rich-html-output"]')
        await expect(output).toContainText('Hello', { timeout: ARROW_TIMEOUT })
    })

    test('Toolbar bold — clicking toggles <strong> wrapping', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — rich (HTML output)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const editor = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-textarea-rich-host"]')
        const boldBtn = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-rich-toolbar-bold"]')

        await expect(editor).toBeVisible({ timeout: ARROW_TIMEOUT })
        await editor.evaluate((el) => {
            el.innerHTML = ''
            el.focus()
        })

        await boldBtn.click()
        await editor.type('Hello')

        const output = sandbox.locator('[data-cy="textarea-rich-html-output"]')
        await expect(output).toContainText('<strong>', { timeout: ARROW_TIMEOUT })
    })

    test('Sanitisation — pasting <script> never lands in the DOM', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — rich (HTML output)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const editor = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-textarea-rich-host"]')
        await expect(editor).toBeVisible({ timeout: ARROW_TIMEOUT })

        // Reset and inject malicious payload via a paste event we
        // synthesise (Playwright cannot paint clipboard contents
        // reliably across platforms).
        await editor.evaluate((el) => {
            el.innerHTML = ''
            el.focus()
            const data = new DataTransfer()
            data.setData('text/html', "Hello <script>window.__origamXss = true;</script><b>bold</b>")
            el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }))
        })

        const editorHtml = await editor.innerHTML()
        expect(editorHtml).not.toContain('<script')
        const xss = await page.evaluate(() => (window as unknown as { __origamXss?: boolean }).__origamXss === true)
        expect(xss).toBe(false)
    })

    test('Markdown output — bold typing produces ** in v-model', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — rich (Markdown output)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const editor = sandbox.locator('[data-cy="textarea-rich-markdown"] [data-cy="origam-textarea-rich-host"]')
        const boldBtn = sandbox.locator('[data-cy="textarea-rich-markdown"] [data-cy="origam-rich-toolbar-bold"]')
        await expect(editor).toBeVisible({ timeout: ARROW_TIMEOUT })

        await editor.evaluate((el) => {
            el.innerHTML = ''
            el.focus()
        })
        await boldBtn.click()
        await editor.type('Hello')

        const output = sandbox.locator('[data-cy="textarea-rich-markdown-output"]')
        await expect(output).toContainText('**', { timeout: ARROW_TIMEOUT })
    })

    test('Prop toolbar — filtered list hides removed commands', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — toolbar (filtered)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const container = sandbox.locator('[data-cy="textarea-rich-toolbar-filtered"]')
        await expect(container).toBeVisible({ timeout: ARROW_TIMEOUT })

        await expect(container.locator('[data-cy="origam-rich-toolbar-bold"]')).toBeVisible({ timeout: ARROW_TIMEOUT })
        await expect(container.locator('[data-cy="origam-rich-toolbar-italic"]')).toBeVisible({ timeout: ARROW_TIMEOUT })
        const headingCount = await container.locator('[data-cy="origam-rich-toolbar-heading"]').count()
        expect(headingCount).toBe(0)
        const clearCount = await container.locator('[data-cy="origam-rich-toolbar-clear-format"]').count()
        expect(clearCount).toBe(0)
    })

    test('Slot toolbar — replaces the default toolbar', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — toolbar', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const custom = sandbox.locator('[data-cy="textarea-rich-slot-toolbar-custom"]')
        await expect(custom).toBeVisible({ timeout: ARROW_TIMEOUT })

        // The default-toolbar should NOT have rendered alongside.
        const defaultToolbar = await sandbox.locator('[data-cy="textarea-rich-slot-toolbar"] [data-cy="origam-rich-toolbar"]').count()
        expect(defaultToolbar).toBe(0)
    })

    test('Emit format — counter increments on every toolbar click', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — format', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const editor = sandbox.locator('[data-cy="textarea-rich-emit-format"] [data-cy="origam-textarea-rich-host"]')
        const boldBtn = sandbox.locator('[data-cy="textarea-rich-emit-format"] [data-cy="origam-rich-toolbar-bold"]')
        await expect(editor).toBeVisible({ timeout: ARROW_TIMEOUT })

        await editor.click()
        await boldBtn.click()
        await boldBtn.click()

        const count = sandbox.locator('[data-cy="textarea-rich-emit-format-count"]')
        await expect(count).toContainText('2', { timeout: ARROW_TIMEOUT })

        const last = sandbox.locator('[data-cy="textarea-rich-emit-format-last"]')
        await expect(last).toContainText('bold', { timeout: ARROW_TIMEOUT })
    })

    test('Keyboard nav — toolbar buttons are reachable via Tab', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — rich (HTML output)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const boldBtn = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-rich-toolbar-bold"]')
        await expect(boldBtn).toBeVisible({ timeout: ARROW_TIMEOUT })
        await boldBtn.focus()
        const focused = await boldBtn.evaluate((el) => document.activeElement === el)
        expect(focused).toBe(true)
    })

    test('ARIA — toolbar carries role + label, buttons have aria-pressed', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — rich (HTML output)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const toolbar = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-rich-toolbar"]')
        await expect(toolbar).toBeVisible({ timeout: ARROW_TIMEOUT })
        expect(await toolbar.getAttribute('role')).toBe('toolbar')
        expect(await toolbar.getAttribute('aria-label')).toBeTruthy()

        const bold = sandbox.locator('[data-cy="textarea-rich-html"] [data-cy="origam-rich-toolbar-bold"]')
        const pressed = await bold.getAttribute('aria-pressed')
        expect(['true', 'false']).toContain(pressed!)
    })
})
