import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/categories')
})

test('categories page has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Categories/)
  await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible()
})

test ('categories page has avatar', async ({ page }) => {
  await expect(page.getByText('AE')).toBeVisible()
})

test('categories page has create category form', async ({ page }) => {
  await expect(page.getByLabel('Toggle Visibility')).toBeVisible()
  await page.getByLabel('Toggle Visibility').click()
  
  await expect(page.getByLabel('Name')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Create category' })).toBeVisible()
})

test('categories page has data-table with correct columns', async ({ page }) => {
  await expect(page.getByRole('cell', { name: 'Name' }).first()).toBeVisible()
  await expect(page.getByRole('cell', { name: '# of Bookmarks' }).first()).toBeVisible()
  await expect(page.locator('th').nth(3).first()).toBeVisible()
})
