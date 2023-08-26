import { HTMLAttributes, forwardRef } from 'react'
import styles from './container.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
}

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ children, title, className, ...otherProps }, ref) => {
    return (
      <div
        className={`${styles.qxContainer} ${className ? className : ''}`}
        ref={ref}
        {...otherProps}
      >
        <header data-qx-container-header>
          <span data-qx-container-border="top" />
          <span data-qx-container-border="right" />
          <span data-qx-container-corner="rightUp"></span>
          <span data-qx-container-corner="rightDown"></span>
          <h1 data-qx-container-header-title>{title}</h1>
          <span data-qx-container-border="bottom" />
          <span data-qx-container-border="left" />
          <span data-qx-container-corner="leftUp"></span>
          <span data-qx-container-corner="leftDown"></span>
        </header>
        <div data-qx-container-content>{children}</div>
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container
