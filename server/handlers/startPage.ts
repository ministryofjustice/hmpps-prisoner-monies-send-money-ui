import type { RequestHandler } from 'express'

const GOV_UK_START_PAGE_URL = 'https://www.gov.uk/send-prisoner-money'
const { ENVIRONMENT_NAME = 'DEV', SEND_MONEY_URL } = process.env

function startPageHandler(): RequestHandler {
  return (_req, res) => {
    if (ENVIRONMENT_NAME === 'PROD') {
      return res.redirect(GOV_UK_START_PAGE_URL)
    }
    return res.render('pages/start-page', { SEND_MONEY_URL })
  }
}

export default startPageHandler
