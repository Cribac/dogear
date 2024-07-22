import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

/**
 * Setup storage state for authentication
 * @see https://playwright.dev/docs/auth#basic-shared-account-in-all-tests
 * @see https://mokkapps.de/blog/login-at-supabase-via-rest-api-in-playwright-e2e-test
 */
setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/signin')
  await page.waitForTimeout(1000)
  await page.getByLabel('Email').fill('admin@example.com')
  await page.waitForTimeout(1000)
  await page.getByLabel('Password').fill('admin123')
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Sign in' }).click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('http://localhost:4321/')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()

  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})
