import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-treeview-origamtreeview-story-vue'

test.describe('OrigamTreeview', () => {
	test('Default variant renders root-level nodes', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-default"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Should render the 3 root nodes (src, tokens, README.md)
		const rootNodes = treeview.locator(':scope > .origam-treeview-node')
		await expect(rootNodes).toHaveCount(3)
	})

	test('Initially-collapsed node hides children from DOM', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-default"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// src/components/Btn.vue should NOT be in the DOM yet (parent not expanded)
		const btnNode = treeview.locator('[data-cy="treeview-node-src/components/Btn.vue"]')
		await expect(btnNode).toHaveCount(0)
	})

	test('Clicking chevron expands node and reveals children', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-default"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Click the chevron of the 'src' node
		const srcNode = treeview.locator('[data-cy="treeview-node-src"]')
		const chevron = srcNode.locator(':scope > [role="treeitem"] .origam-treeview-node__chevron').first()
		await chevron.click()
		await page.waitForTimeout(300)

		// Children group should now exist
		const childrenGroup = srcNode.locator(':scope > .origam-treeview-node__children')
		await expect(childrenGroup).toBeVisible()
	})

	test('Clicking expanded chevron collapses the node and removes children from DOM', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Show lines', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-show-lines"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// 'src' is pre-expanded; click its chevron to collapse
		const srcNode = treeview.locator('[data-cy="treeview-node-src"]')
		const chevron = srcNode.locator(':scope > [role="treeitem"] .origam-treeview-node__chevron').first()
		await chevron.click()
		await page.waitForTimeout(300)

		// Children group should be gone
		const childrenGroup = srcNode.locator(':scope > .origam-treeview-node__children')
		await expect(childrenGroup).toHaveCount(0)
	})

	test('selectMode="single" emits update:modelValue on leaf click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Selection single', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-single"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Click Btn.vue (leaf)
		const btnRow = treeview.locator('[data-cy="treeview-row-src/components/Btn.vue"]')
		await expect(btnRow).toBeVisible({ timeout: 5000 })
		await btnRow.click()
		await page.waitForTimeout(300)

		// Row should gain selected class
		await expect(btnRow).toHaveClass(/origam-treeview-node__row--selected/)
	})

	test('selectMode="multiple" selecting two leaves gives both selected class', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Selection multiple', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-multiple"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Click Btn.vue
		const btnRow = treeview.locator('[data-cy="treeview-row-src/components/Btn.vue"]')
		await expect(btnRow).toBeVisible({ timeout: 5000 })
		await btnRow.click()
		await page.waitForTimeout(200)

		// Click Card.vue
		const cardRow = treeview.locator('[data-cy="treeview-row-src/components/Card.vue"]')
		await expect(cardRow).toBeVisible({ timeout: 5000 })
		await cardRow.click()
		await page.waitForTimeout(200)

		// Both should be selected
		await expect(btnRow).toHaveClass(/origam-treeview-node__row--selected/)
		await expect(cardRow).toHaveClass(/origam-treeview-node__row--selected/)
	})

	test('Disabled node does not react to click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Disabled nodes', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-disabled"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		const disabledRow = treeview.locator('[data-cy="treeview-row-disabled-file.ts"]')
		await expect(disabledRow).toBeVisible({ timeout: 5000 })

		// Try clicking — should not get selected class
		await disabledRow.click({ force: true })
		await page.waitForTimeout(200)

		await expect(disabledRow).not.toHaveClass(/origam-treeview-node__row--selected/)
	})

	test('expandOnClick=true — row click expands the node', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Expand on click', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-expand-on-click"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Click the entire row of 'src' (not just the chevron)
		const srcRow = treeview.locator('[data-cy="treeview-row-src"]')
		await srcRow.click()
		await page.waitForTimeout(300)

		// Children group should appear
		const srcNode = treeview.locator('[data-cy="treeview-node-src"]')
		const childrenGroup = srcNode.locator(':scope > .origam-treeview-node__children')
		await expect(childrenGroup).toBeVisible()
	})

	test('showLines=true renders guide elements', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Show lines', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-show-lines"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Guide elements should exist in expanded nodes
		const guides = treeview.locator('.origam-treeview-node__guide')
		const count = await guides.count()
		expect(count).toBeGreaterThan(0)
	})

	test('showLines=false renders no guide elements', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('No lines', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-no-lines"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		const guides = treeview.locator('.origam-treeview-node__guide')
		await expect(guides).toHaveCount(0)
	})

	test('Keyboard ArrowDown moves focus to the next treeitem', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Show lines', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-show-lines"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Focus the first treeitem
		const treeitems = treeview.locator('[role="treeitem"]')
		const firstItem = treeitems.first()
		await firstItem.focus()
		await page.waitForTimeout(100)

		// Press ArrowDown
		await page.keyboard.press('ArrowDown')
		await page.waitForTimeout(200)

		// Focus should have moved: the second item should be focused
		const secondItem = treeitems.nth(1)
		await expect(secondItem).toBeFocused()
	})

	test('Keyboard ArrowRight on collapsed folder expands it', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const treeview = sandbox.locator('[data-cy="treeview-default"]')
		await expect(treeview).toBeVisible({ timeout: 5000 })

		// Focus the 'src' row and press ArrowRight to expand
		const srcRow = treeview.locator('[data-cy="treeview-row-src"]')
		await srcRow.focus()
		await page.keyboard.press('ArrowRight')
		await page.waitForTimeout(300)

		const srcNode = treeview.locator('[data-cy="treeview-node-src"]')
		const childrenGroup = srcNode.locator(':scope > .origam-treeview-node__children')
		await expect(childrenGroup).toBeVisible()
	})
})
