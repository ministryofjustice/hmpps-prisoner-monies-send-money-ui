import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/start-page')
})

test('Start Now button navigates to correct page', async ({ page }) => {
  await page.getByRole('button', { name: 'Start now' }).click()
  await expect(page).toHaveURL(/\/en-gb\/$/)
  await expect(page.getByRole('heading', { level: 1, name: /Before you continue/i })).toBeVisible()
})

test('Staying in touch link navigates to info page', async ({ page }) => {
  await page.getByRole('link', { name: 'Staying in touch with someone' }).click()
  await expect(page).toHaveURL(/\/info$/)
  await expect(page.getByRole('heading', { name: 'Staying in touch with someone' })).toBeVisible()
})

test('Gov UK banner content', async ({ page }) => {
  // Gov UK header
  const banner = page.getByRole('banner')
  await expect(banner).toBeVisible()
  await expect(banner.getByRole('link', { name: /go to the gov\.uk homepage/i })).toBeVisible()
})

test('Landing page text content', async ({ page }) => {
  // Heading text
  await expect(page.getByRole('heading', { level: 1, name: /Send money to someone in prison/i })).toBeVisible()

  // Text under heading
  await expect(page.locator('#content')).toContainText(
    'You can use this service to make a payment by Visa, Mastercard or Maestro debit card. Money usually takes less than 3 working days to reach a prisoner’s account, but it may take longer.',
  )
  await expect(page.locator('#content')).toContainText(
    'This service is free, secure and available in all prisons in England and Wales.',
  )
  await expect(page.getByLabel('Information').getByRole('paragraph')).toContainText(
    'You can no longer send money by bank transfer, cheque, postal order or send cash by post to any prison. You’ll need to use a debit card instead.',
  )

  // Start Now button
  await expect(page.getByRole('button', { name: 'Start now' })).toBeVisible()

  // Before You Start section
  const beforeYouStart = page.locator('#before-you-start')

  await expect(beforeYouStart).toContainText('Before you start')
  await expect(beforeYouStart).toContainText('You’ll need the:')
  await expect(beforeYouStart).toContainText('prisoner’s date of birth')
  await expect(beforeYouStart).toContainText('prisoner number')

  await expect(beforeYouStart).toContainText(
    'You can get help with making a payment, ask a question about a payment you’ve already made, or get help with accessing the service.',
  )
  await expect(beforeYouStart).toContainText('You may be able to apply for an exemption - for example if you:')
  await expect(beforeYouStart).toContainText(
    'are unable to use a computer, a smart phone or the internet do not have a debit card',
  )
  await expect(beforeYouStart).toContainText('are unable to use a computer, a smart phone or the internet')
  await expect(beforeYouStart).toContainText('do not have a debit card')
  await expect(beforeYouStart).toContainText('This will allow you to send money by post.')
  await expect(beforeYouStart).toContainText(
    'You can also find out how to get a debit card by setting up a basic bank account.',
  )

  await expect(page.locator('#if-you-cannot-use-the-online-service')).toContainText(
    'If you cannot use the online service',
  )
  await expect(page.locator('#help-using-the-service')).toContainText('Help using the service')
})

test('links inside text content', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'You can get help' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'apply for an exemption' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'setting up a basic bank' })).toBeVisible()
})

test('other topics to explore', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Related content' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Staying in touch with someone' })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Explore the topic' })).toBeVisible()
  await expect(page.getByLabel('Explore the topic').getByRole('link', { name: 'Prisons and probation' })).toBeVisible()
})

test('breadcrumbs', async ({ page, isMobile }) => {
  await expect(page.locator('ol').getByRole('link', { name: 'Home' })).toBeVisible()
  await expect(page.locator('ol').getByRole('link', { name: 'Prisons and probation' })).toBeVisible()
  if (!isMobile) {
    await expect(page.locator('ol').getByRole('link', { name: 'Crime, justice and the law' })).toBeVisible()
  }
})

test('footer exists', async ({ page }) => {
  await expect(page.locator('footer')).toBeVisible()
  await expect(page.getByRole('heading', { name: /Services and information/i })).toBeVisible()
})
