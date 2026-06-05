import { Router } from 'express'

import type { Services } from '../services'
import startPageHandler from '../handlers/startPage'
// import { Page } from '../services/auditService'

export default function routes({ exampleService }: Services): Router {
  const router = Router()

  router.get('/', async (_req, res, _next) => {
    // await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })

    const currentTime = await exampleService.getCurrentTime()
    return res.render('pages/index', { currentTime })
  })

  router.get('/start-page', startPageHandler())

  router.get('/info-page', async (_req, res, _next) => {
    return res.render('pages/info-page')
  })
  return router
}
