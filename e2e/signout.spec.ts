import { test, expect } from '@playwright/test'

test('a user can signout', async ({ page }) => {
  await page.goto('/')
  
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  await page.getByRole('button', { name: 'Sign out' }).click()
  
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
})
