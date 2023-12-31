import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'

const languages = ['en', 'fr', 'pt'] as const

const I18nMiddleware = createI18nMiddleware(languages, 'en')

export function middleware(request: NextRequest) {
  // validate if cookie Next-Locale contains a available locale
  // if not, set the cookie to the default locale
  const cookieObtained = request.cookies.get('Next-Locale')
  if (
    cookieObtained !== undefined &&
    !languages.includes(cookieObtained.value as any)
  ) {
    request.cookies.set('Next-Locale', 'en')
  }

  /**
   * TODO - Has a mismatch type in i18nMiddleware and NextRequest
   * @see For more details:
   * For now we need to use the any type to avoid the error
   */
  return I18nMiddleware(request as any)
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
