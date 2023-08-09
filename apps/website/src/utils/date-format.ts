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
