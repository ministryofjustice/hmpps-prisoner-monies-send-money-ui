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

  router.get('/en-gb/', async (_req, res, _next) => {
    return res.render('pages/before-you-continue', { continueUrl: '/payment-choice', backLinkHref: '/' })
  })

  router.get('/payment-choice', async (_req, res, _next) => {
    return res.status(404).send('Not Found')
    // return res.render('pages/payment-choice', { backLinkHref: '/en-gb/' })
  })

  router.get('/debit-card/details', async (_req, res, _next) => {
    // return res.status(404).send('Not Found')
    return res.render('pages/prisoner-details', {
      backLinkHref: '/en-gb/payment-choice',
    })
  })

  router.get('/terms', async (_req, res, _next) => {
    return res.render('pages/terms')
  })

  router.get('/privacy', async (_req, res, _next) => {
    return res.render('pages/privacy')
  })

  router.get('/contact-us', async (_req, res, _next) => {
    return res.render('pages/contact-us')
  })

  return router
}
