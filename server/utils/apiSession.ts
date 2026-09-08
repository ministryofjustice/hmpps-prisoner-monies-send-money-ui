import type { Request } from 'express'
import config from '../config'
import generateOauthClientToken from './clientCredentials'

type ApiToken = {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  scope?: string
  obtained_at: number
}

function isTokenExpired(token: ApiToken): boolean {
  return Date.now() >= token.obtained_at + token.expires_in * 1000 - 10000
}

async function fetchApiToken(username: string, password: string): Promise<ApiToken> {
  const response = await fetch(`${config.apis.exampleApi.url}/oauth2/token/`, {
    method: 'POST',
    headers: {
      Authorization: generateOauthClientToken(
        config.apis.hmppsAuth.systemClientId,
        config.apis.hmppsAuth.systemClientSecret,
      ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    }).toString(),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Failed to fetch API token: ${response.status} ${body}`)
  }

  const token = (await response.json()) as Omit<ApiToken, 'obtained_at'>
  return { ...token, obtained_at: Date.now() }
}

export async function getApiToken(req: Request): Promise<ApiToken> {
  const username = process.env.SHARED_API_USERNAME || 'send-money'
  const password = process.env.SHARED_API_PASSWORD || 'send-money'

  if (!req.session) {
    throw new Error('Session middleware is required before using getApiToken')
  }

  if (!req.session.apiToken || isTokenExpired(req.session.apiToken)) {
    req.session.apiToken = await fetchApiToken(username, password)
  }

  return req.session.apiToken
}

export async function apiRequest<T = unknown>(req: Request, path: string, init: RequestInit = {}): Promise<T> {
  const token = await getApiToken(req)

  const headers = {
    ...(init.headers ?? {}),
    Authorization: `Bearer ${token.access_token}`,
    Accept: 'application/json',
  }

  const response = await fetch(`${config.apis.exampleApi.url}${path}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`API request failed: ${response.status} ${body}`)
  }

  return response.json() as Promise<T>
}
