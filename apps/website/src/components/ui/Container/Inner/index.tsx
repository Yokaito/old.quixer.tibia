import classNames from 'classnames'
import { HTMLAttributes, forwardRef } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  hasPadding?: boolean
}

export const InnerContainer = forwardRef<HTMLDivElement, Props>(function (
  { children, className, hasPadding = true, ...otherProps },
  ref
) {
  const classnames = classNames({
    'p-1': hasPadding,
  })

  return (
    <div
      ref={ref}
      className={`${classnames} block w-full h-max relative bg-600 mb-4 outline-1 outline outline-secondary border border-quintenary last:mb-0 shadow-container  ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  )
})

InnerContainer.displayName = 'InnerContainer'

export default InnerContainer
