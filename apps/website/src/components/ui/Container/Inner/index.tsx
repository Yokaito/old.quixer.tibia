import { HTMLAttributes, forwardRef } from 'react'
import styles from './inner.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const InnerContainer = forwardRef<HTMLDivElement, Props>(function (
  { children, ...otherProps },
  ref
) {
  return (
    <div
      data-qx-inner-container
      ref={ref}
      className={`${styles.qxInnerContainer}`}
      {...otherProps}
    >
      {children}
    </div>
  )
})

InnerContainer.displayName = 'InnerContainer'

export default InnerContainer
