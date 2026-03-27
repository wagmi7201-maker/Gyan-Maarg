export type AuthUser = {
  id: number
  name: string
  email: string
  phone: string
  points: number
  referral_code: string
  total_referrals: number
  date_joined: string
}

type AuthPayload = {
  user?: AuthUser
  tokens?: {
    access?: string
    refresh?: string
  }
}

const ACCESS_TOKEN_KEY = "access"
const REFRESH_TOKEN_KEY = "refresh"
const USER_KEY = "auth_user"

export const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export const hasAuthToken = () => {
  if (typeof window === "undefined") return false
  return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY))
}

export const saveAuthSession = (payload: AuthPayload) => {
  if (typeof window === "undefined") return

  const access = payload.tokens?.access
  const refresh = payload.tokens?.refresh

  if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  if (payload.user) localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
}

export const clearAuthSession = () => {
  if (typeof window === "undefined") return

  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
