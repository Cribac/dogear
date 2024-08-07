import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
  await page.goto('/')
  
  await expect(page).toHaveTitle(/Bookmarks/)
})

test ('homepage has avatar', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('AE')).toBeVisible()
})

test('homepage has create bookmark form', async ({ page }) => {
  await page.goto('/')
  
  await expect(page.getByLabel('URL')).toBeVisible()
  await expect(page.getByLabel('Name')).toBeVisible()
  await expect(page.locator('button').filter({ hasText: 'Select a category' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Create bookmark' })).toBeVisible()
})

test('homepage has data-table with correct columns', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('cell', { name: 'Name' }).first()).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Url' }).first()).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Category' }).first()).toBeVisible()
  await expect(page.locator('th').nth(4).first()).toBeVisible()
})
