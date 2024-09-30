import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('homepage has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Bookmarks/)
  await expect(page.getByRole('heading', { name: 'Bookmarks' })).toBeVisible()
})

test ('homepage has avatar', async ({ page }) => {
  await expect(page.getByText('AE')).toBeVisible()
})

test('homepage has create bookmark form', async ({ page }) => {
  await expect(page.getByLabel('Toggle Visibility')).toBeVisible()
  await page.getByLabel('Toggle Visibility').click()
  await expect(page.getByLabel('URL')).toBeVisible()
  await expect(page.getByLabel('Name')).toBeVisible()
  await expect(page.locator('button').filter({ hasText: 'Select a category' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Create bookmark' })).toBeVisible()
})

test('homepage has data-table with correct columns', async ({ page }) => {
  await expect(page.getByRole('cell', { name: 'Name' }).first()).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Url' }).first()).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Category' }).first()).toBeVisible()
  await expect(page.locator('th').nth(4).first()).toBeVisible()
})
