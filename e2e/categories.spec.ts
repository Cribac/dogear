import { test, expect } from '@playwright/test'

test('categories page has title', async ({ page }) => {
  await page.goto('/categories')
  
  await expect(page).toHaveTitle(/Categories/)
  await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible()
})

test ('categories page has avatar', async ({ page }) => {
  await page.goto('/categories')

  await expect(page.getByText('AE')).toBeVisible()
})

test('categories page has create category form', async ({ page }) => {
  await page.goto('/categories')
  
  await expect(page.getByLabel('Name')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Create category' })).toBeVisible()
})

test('categories page has data-table with correct columns', async ({ page }) => {
  await page.goto('/categories')

  await expect(page.getByRole('cell', { name: 'Name' }).first()).toBeVisible()
  await expect(page.getByRole('cell', { name: '# of Bookmarks' }).first()).toBeVisible()
  await expect(page.locator('th').nth(3).first()).toBeVisible()
})
