import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/start-page')
})

test('Heading', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: /Send money to someone in prison/i })).toBeVisible()
})

test('Start now button with navigation', async ({ page }) => {
  const startNowButton = page.getByRole('button', { name: 'Start now' })
  await expect(startNowButton).toBeVisible()
  startNowButton.click()
  await expect(page).toHaveURL(/\/en-gb\/$/)
  await expect(page.getByRole('heading', { level: 1, name: /Before you continue/i })).toBeVisible()
})
