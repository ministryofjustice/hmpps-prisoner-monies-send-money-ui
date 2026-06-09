import { expect, test } from '@playwright/test'
import exampleApi from '../mockApis/exampleApi'

import { resetStubs } from '../testUtils'
import ExamplePage from '../pages/examplePage'

test.describe('Example', () => {
  test.afterEach(async () => {
    await resetStubs()
  })

  test('Time from exampleApi is visible on page', async ({ page }) => {
    await exampleApi.stubExampleTime()
    // await login(page)

    await page.goto('/')

    const examplePage = await ExamplePage.verifyOnPage(page)

    await expect(examplePage.timestamp).toContainText('The time is currently')
  })

  test.skip('ExampleApi failure shows error page', async ({ page }) => {
    await exampleApi.stubExampleTime(500)
    // await login(page)

    await page.goto('/')

    await expect(page.locator('h1', { hasText: 'Internal Server Error' })).toBeVisible()
  })
})
