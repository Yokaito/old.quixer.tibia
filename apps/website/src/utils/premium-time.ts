import { convertToUnixTime, createDateAsUTC } from './date-format'

export const verifyPremiumTime = (
  premiumDays: number,
  lastDayLoginUnixTime: number
) => {
  const dateNow = createDateAsUTC(new Date())
  const dateNowUnixTime = convertToUnixTime(dateNow.toString())
  const lastDayLogin = createDateAsUTC(new Date(lastDayLoginUnixTime * 1000))

  let lastDayLoginUpdated = lastDayLoginUnixTime
  let saveOnDatabase = false
  let premiumDaysUpdated = premiumDays
  let isPremium = false

  if (premiumDays > 0) {
    if (lastDayLoginUnixTime === 0) {
      lastDayLoginUpdated = dateNowUnixTime
      saveOnDatabase = true
    } else {
      const differenceInDays = Math.floor(
        (dateNow.getTime() - lastDayLogin.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (differenceInDays > 0) {
        if (differenceInDays > premiumDays) {
          lastDayLoginUpdated = 0
          premiumDaysUpdated = 0
        } else {
          premiumDaysUpdated -= differenceInDays
          lastDayLoginUpdated = dateNowUnixTime
        }

        saveOnDatabase = true
      }
    }
  }

  const lastDayLoginUpdatedDate = createDateAsUTC(
    new Date(lastDayLoginUpdated * 1000)
  )

  const premiumDateExpire = new Date(
    lastDayLoginUpdatedDate.getTime() + premiumDaysUpdated * 24 * 60 * 60 * 1000
  )
  const premiumDateExpireUnixTime =
    lastDayLoginUpdated !== 0
      ? convertToUnixTime(premiumDateExpire.toString())
      : null

  if (premiumDaysUpdated > 0) {
    isPremium = true
  }

  return {
    lastDayLoginUpdated,
    premiumDaysUpdated,
    saveOnDatabase,
    premiumDateExpireUnixTime,
    isPremium,
  }
}
