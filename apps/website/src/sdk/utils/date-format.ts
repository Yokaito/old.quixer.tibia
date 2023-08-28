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
