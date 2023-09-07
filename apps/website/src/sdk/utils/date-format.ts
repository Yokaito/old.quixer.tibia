export const defaultFormat = (date: Date, locale: 'en' | 'pt' | 'fr') => {
  let localeFormatted = null

  switch (locale) {
    case 'en':
      localeFormatted = 'en-US'
      break
    case 'pt':
      localeFormatted = 'pt-BR'
      break
    case 'fr':
      localeFormatted = 'fr-FR'
      break
    default:
      localeFormatted = 'en-US'
      break
  }

  return new Intl.DateTimeFormat(localeFormatted, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const convertToUnixTime = (date: string) => {
  return Math.round(new Date(date).getTime() / 1000)
}

export const createDateAsUTC = (date: Date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  )
}

export const convertUnixTimeToDate = (unixTime: number, locale: string) => {
  const date = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(unixTime * 1000))

  return date
}
