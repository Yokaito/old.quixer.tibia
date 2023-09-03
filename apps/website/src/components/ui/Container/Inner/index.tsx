import { HTMLAttributes, forwardRef } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const InnerContainer = forwardRef<HTMLDivElement, Props>(function (
  { children, className, ...otherProps },
  ref
) {
  return (
    <div
      data-qx-inner-container
      ref={ref}
      className={`block w-full h-max relative bg-600 p-1 mb-4 outline-1 outline outline-secondary border border-quintenary last:mb-0 shadow-container  ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  )
})

InnerContainer.displayName = 'InnerContainer'

export default InnerContainer
