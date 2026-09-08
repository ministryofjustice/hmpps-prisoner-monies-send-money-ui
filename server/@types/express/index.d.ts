import { HmppsUser } from '../../interfaces/hmppsUser'

export declare module 'express-session' {
  type ApiToken = {
    access_token: string
    refresh_token?: string
    expires_in: number
    token_type: string
    scope?: string
    obtained_at: number
  }

  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    returnTo: string
    apiToken?: ApiToken
  }
}

export declare global {
  namespace Express {
    interface User {
      username: string
      token: string
      authSource: string
    }

    interface Request {
      verified?: boolean
      id: string
      logout(done: (err: unknown) => void): void
    }

    interface Locals {
      user: HmppsUser
      cspNonce: string
      csrfToken: string
      asset_path: string
      applicationName: string
      environmentName: string
      environmentNameColour: string
      appInsightsConnectionString?: string
      appInsightsApplicationName?: string
      buildNumber?: string
    }
  }
}
