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
  await startNowButton.click()
  await expect(page.getByRole('heading', { level: 1, name: /Before you continue/i })).toBeVisible()
})

test('Staying in touch link with navigation', async ({ page }) => {
  const stayingInTouchLink = page.getByRole('link', { name: 'Staying in touch with someone in prison' })
  await expect(stayingInTouchLink).toBeVisible()
  await stayingInTouchLink.click()
  await expect(page).toHaveURL(/\/info-page$/)
  await expect(page.getByRole('heading', { level: 1, name: /Staying in touch with someone in prison/i })).toBeVisible()
})
