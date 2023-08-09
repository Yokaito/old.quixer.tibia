import { otConfig } from '@/quixer'

export const getVocationName = (vocation: number) => {
  const vocationName = otConfig.vocations.find(
    (vocationItem) => vocationItem.id === vocation
  )

  return vocationName?.name
}
