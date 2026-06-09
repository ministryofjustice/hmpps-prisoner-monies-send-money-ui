import type { RequestHandler } from 'express'

export type startPageHandlerConfig = {
  production: boolean
  productionStartPageUrl: string
  sendMoneyUrl: string
}

function startPageHandler(config: startPageHandlerConfig): RequestHandler {
  return (_req, res) => {
    if (config.production) {
      return res.redirect(config.productionStartPageUrl)
    }
    return res.render('pages/start-page', { sendMoneyUrl: config.sendMoneyUrl })
  }
}

export default startPageHandler
