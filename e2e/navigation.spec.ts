import { test, expect } from '@playwright/test'

test('a logged in user can navigate to categories', async ({ page }) => {
  await page.goto('/')
  
  await expect(page.getByRole('link', { name: 'Categories' })).toBeVisible()
  await page.getByRole('link', { name: 'Categories' }).click()
  
  await expect(page).toHaveURL('/categories')
})

test('a logged in user can navigate from categories to bookmarks', async ({ page }) => {
  await page.goto('/categories')
  
  await expect(page.getByRole('link', { name: 'Bookmarks' })).toBeVisible()
  await page.getByRole('link', { name: 'Bookmarks' }).click()
  
  await expect(page).toHaveURL('/')
})

test('a click on the logo navigates to the homepage', async ({ page }) => {
  await page.goto('/')
  
  await page.getByRole('link', { name: 'Categories' }).click()
  await expect(page).toHaveURL('/categories')

  await page.getByTestId('logo').click()
  await expect(page).toHaveURL('/')
})

test('navigation has a signout button', async ({ page }) => {
  await page.goto('/')
  
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
})

test('navigation has mode toggle button', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Toggle Dark Mode').click()
  await expect(page.getByLabel('Toggle Light Mode')).toBeVisible()
})
