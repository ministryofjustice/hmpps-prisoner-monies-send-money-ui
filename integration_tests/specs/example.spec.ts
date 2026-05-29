import { expect, test } from '@playwright/test'
// import exampleApi from '../mockApis/exampleApi'

import { resetStubs } from '../testUtils'
import ExamplePage from '../pages/examplePage'

test.describe('Example', () => {
  test.afterEach(async () => {
    await resetStubs()
  })

  test('Time from exampleApi is visible on page', async ({ page }) => {
    // await exampleApi.stubExampleTime()
    // await login(page)

    const examplePage = await ExamplePage.verifyOnPage(page)

    expect(examplePage.timestamp).toHaveText('The time is currently')
  })

  test('ExampleApi failure shows error page', async ({ page }) => {
    // await exampleApi.stubExampleTime(500)
    // await login(page)

    await expect(page.locator('h1', { hasText: 'Internal Server Error' })).toBeVisible()
  })
})
