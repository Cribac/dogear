import { test, expect } from '@playwright/test'

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } })

test('register page shows register form', async ({ page }) => {
  await page.goto('/register')
  
  await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Password')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible()
})

test('it displays a message when email is invalid', async ({ page }) => {
  await page.goto('/register')
  await page.waitForTimeout(1000) // @TODO: needed rn to work in chromium; investigate why
  
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('invalid')
  await page.getByRole('button', { name: 'Register' }).click()

  await expect(page.getByText('email must be a valid email')).toBeVisible()
})

test('it displays a message when no email is provided', async ({ page }) => {
  await page.goto('/register')
  await page.waitForTimeout(1000)

  await page.getByRole('button', { name: 'Register' }).click()
  
  await expect(page.getByText('email is a required field')).toBeVisible()
})

test('it displays a message when no password is provided', async ({ page }) => {
  await page.goto('/register')
  await page.waitForTimeout(1000) // @TODO: needed rn to work in chromium; investigate why
  
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('foo@example.com')
  await page.getByRole('button', { name: 'Register' }).click()
  
  await expect(page.getByText('password is a required field')).toBeVisible()
})
