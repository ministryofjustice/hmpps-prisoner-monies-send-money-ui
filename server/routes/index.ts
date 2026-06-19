import { Router } from 'express'

import config from '../config'
import startPageHandler from '../handlers/startPage'
import { Services } from '../services'

export default function routes(_services: Services): Router {
  const router = Router()

  router.get(
    '/',
    startPageHandler({
      production: config.production,
      productionStartPageUrl: config.productionStartPageUrl,
      sendMoneyUrl: config.sendMoneyUrl,
    }),
  )

  router.get('/info-page', async (_req, res, _next) => {
    return res.render('pages/info-page')
  })
  return router
}
