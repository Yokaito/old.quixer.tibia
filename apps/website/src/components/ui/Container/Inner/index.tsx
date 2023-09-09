import { cn } from '@/sdk/utils/tailwind'

import { HTMLAttributes, forwardRef } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  hasPadding?: boolean
}

export const InnerContainer = forwardRef<HTMLDivElement, Props>(function (
  { children, className, hasPadding = true, ...otherProps },
  ref
) {
  const classnames = cn(
    'block w-full h-max relative bg-600 mb-4 outline-1 outline outline-secondary border border-quintenary last:mb-0 shadow-container',
    {
      'p-1': hasPadding,
    },
    className
  )

  return (
    <div ref={ref} className={classnames} {...otherProps}>
      {children}
    </div>
  )
})

InnerContainer.displayName = 'InnerContainer'

export default InnerContainer
