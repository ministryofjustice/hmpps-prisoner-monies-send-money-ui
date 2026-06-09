import type { NextFunction, Request, Response } from 'express'
import startPageHandler from './startPage'
import type { startPageHandlerConfig } from './startPage'

// const mockRes = () => {
//   const res = {
//       redirect: jest.fn(),
//       render: jest.fn(),
//     }
//
//   res.redirect = jest.fn().mockReturnValue(res)
//   res.render = jest.fn().mockReturnValue(res)
//
//   return res
// }
//
// describe('startPageHandler', () => {
//   it('redirects to external URL in production', () => {
//     const handler = startPageHandler({
//       production: true,
//       productionStartPageUrl: 'https://www.gov.uk/send-prisoner-money',
//       sendMoneyUrl: 'http://localhost:8004',
//     })
//     const res = mockRes()
//
//     handler({} as any, res as any, jest.fn())
//
//     expect(res.redirect).toHaveBeenCalledWith('https://www.gov.uk/send-prisoner-money')
//     expect(res.render).not.toHaveBeenCalled()
//   })
//
//   it('displays example start page when not in production', () => {
//     const handler = startPageHandler({
//       production: false,
//       productionStartPageUrl: 'https://www.gov.uk/send-prisoner-money',
//       sendMoneyUrl: 'http://localhost:8004',
//     })
//     const res = mockRes()
//
//     handler({} as any, res as any, jest.fn())
//
//     expect(res.render).toHaveBeenCalledWith('pages/start-page', { sendMoneyUrl: 'http://localhost:8004' })
//     expect(res.redirect).not.toHaveBeenCalled()
//   })
// })

/* second go */

type ResSubset = Pick<Response, 'redirect' | 'render'>

const makeRes = (): { res: ResSubset; redirect: jest.Mock; render: jest.Mock } => {
  const redirect = jest.fn()
  const render = jest.fn()
  const res = { redirect, render } as unknown as ResSubset
  return { res, redirect, render }
}

describe('startPageHandler', () => {
  const req = {} as unknown as Request
  const next = jest.fn() as unknown as NextFunction

  it('redirects to external URL in production', () => {
    const config: startPageHandlerConfig = {
      production: true,
      productionStartPageUrl: 'https://www.gov.uk/send-prisoner-money',
      sendMoneyUrl: 'http://localhost:8004',
    }

    const handler = startPageHandler(config)
    const { res, redirect, render } = makeRes()

    handler(req, res as unknown as Response, next)

    expect(redirect).toHaveBeenCalledWith('https://www.gov.uk/send-prisoner-money')
    expect(render).not.toHaveBeenCalled()
  })

  it('displays example start page when not in production', () => {
    const config: startPageHandlerConfig = {
      production: false,
      productionStartPageUrl: 'https://www.gov.uk/send-prisoner-money',
      sendMoneyUrl: 'http://localhost:8004',
    }

    const handler = startPageHandler(config)
    const { res, redirect, render } = makeRes()

    handler(req, res as unknown as Response, next)

    expect(render).toHaveBeenCalledWith('pages/start-page', { sendMoneyUrl: 'http://localhost:8004' })
    expect(redirect).not.toHaveBeenCalled()
  })
})
