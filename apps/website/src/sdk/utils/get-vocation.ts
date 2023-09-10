import { VocationsTypes } from '@/sdk/constants'

export const getVocationName = (vocation: number) => {
  const vocationName = Object.entries(VocationsTypes).find(
    ([key]) => Number(key) === vocation
  )

  return vocationName?.[1]
}
