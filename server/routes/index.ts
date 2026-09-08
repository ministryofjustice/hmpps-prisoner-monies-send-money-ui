import { Router, Request, Response, NextFunction } from 'express'

import config from '../config'
import startPageHandler from '../handlers/startPage'
import { Services } from '../services'
import { apiRequest } from '../utils/apiSession'

export default function routes(_services: Services): Router {
  const router = Router()

  console.log('config.production', config.production)
  router.get(
    '/',
    startPageHandler({
      production: config.production,
      productionStartPageUrl: config.productionStartPageUrl,
      sendMoneyUrl: config.sendMoneyUrl,
    }),
  )

  router.get('/info-page', async (_req: Request, res: Response, _next: NextFunction) => {
    return res.render('pages/info-page')
  })

  router.get('test-api', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await apiRequest(req, '/some/api/resource/')
      return res.render('pages/my-api-data', { data })
    } catch (error) {
      return next(error)
    }
  })

  return router
}
