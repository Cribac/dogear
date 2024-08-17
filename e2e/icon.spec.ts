import { test, expect } from '@playwright/test'

test('it toggles dark and light modes', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Toggle Dark Mode').click()
  await expect(page.getByLabel('Toggle Light Mode')).toBeVisible()
  
  let theme = await page.evaluate(() => window.localStorage.getItem('theme'))
  expect(theme).toBe('dark')

  await page.getByLabel('Toggle Light Mode').click()
  theme = await page.evaluate(() => window.localStorage.getItem('theme'))
  expect(theme).toBe('light')
})
