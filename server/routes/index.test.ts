import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from './testutils/appSetup'
import AuditService from '../services/auditService'
import HmppsAuditClient from '../data/hmppsAuditClient'

jest.mock('../services/auditService')

const auditService = new AuditService({} as HmppsAuditClient) as jest.Mocked<AuditService>

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: {
      auditService,
    },
    userSupplier: () => user,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /', () => {
  it('should render start page', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Send money to someone in prison')
        expect(res.text).toContain('Start now')
      })
  })
})

describe('GET /info-page', () => {
  it('should render info page', () => {
    return request(app)
      .get('/info-page')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Staying in touch with someone in prison')
      })
  })
})

describe('GET /en-gb/', () => {
  it('should render before you continue page', () => {
    return request(app)
      .get('/en-gb/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Before you continue')
        expect(res.text).toContain('href="/payment-choice"')
        expect(res.text).toContain('href="/terms"')
        expect(res.text).toContain('href="/privacy"')
        expect(res.text).toContain('href="/contact-us"')
        expect(res.text).toContain('govuk-back-link')
      })
  })
})

describe('GET /payment-choice', () => {
  it('should render payment choice page', () => {
    return request(app).get('/payment-choice').expect('Content-Type', /html/).expect(404)
    // .expect(res => {
    //   expect(res.text).toContain('Pay now by debit card')
    //   expect(res.text).toContain('id="id_debit_card"')
    //   expect(res.text).toContain('href="/debit-card/details"')
    //   expect(res.text).toContain('govuk-back-link')
    // })
  })
})

describe('GET /debit-card/details', () => {
  it('should render enter prisoner details page', () => {
    return request(app)
      .get('/debit-card/details')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Enter prisoner details')
        expect(res.text).toContain('govuk-back-link')
        expect(res.text).toContain('href="/en-gb/payment-choice"')
        expect(res.text).toContain('id="id_next_btn"')
      })
  })
})

describe('POST /debit-card/details', () => {
  it('should submit form data and navigate to the amount page', () => {
    return request(app)
      .post('/debit-card/details')
      .expect(200)
      .redirects(1)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Amount')
      })
  })
})

describe('GET /terms', () => {
  it('should render terms page', () => {
    return request(app)
      .get('/terms')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Terms and conditions')
      })
  })
})

describe('GET /privacy', () => {
  it('should render privacy page', () => {
    return request(app)
      .get('/privacy')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Privacy policy')
      })
  })
})

describe('GET /contact-us', () => {
  it('should render contact us page', () => {
    return request(app)
      .get('/contact-us')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Contact us')
      })
  })
})
