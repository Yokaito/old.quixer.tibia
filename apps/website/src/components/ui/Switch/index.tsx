import React, { ReactElement, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

interface CaseProps extends Props {
  condition: boolean
}

export const Case = ({ children }: CaseProps) => {
  return children
}

export const Default = ({ children }: { children: ReactElement }) => {
  return children
}

export const Switch = ({ children }: Props) => {
  let matchChild: ReactNode | null = null
  let defaultCase: ReactNode | null = null

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return
    }

    if (!matchChild && child?.type === Case) {
      const { condition } = child?.props

      const conditionResult = Boolean(condition)

      if (conditionResult) {
        matchChild = child
      }
    } else if (!defaultCase && child?.type === Default) {
      defaultCase = child
    }
  })

  return matchChild ?? defaultCase ?? null
}
