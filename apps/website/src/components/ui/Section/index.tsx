import { HTMLAttributes, forwardRef } from 'react'
import styles from './section.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Section = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...otherProps }, ref) => {
    return (
      <section
        className={`${styles.qxSection} ${className ? className : ''}`}
        ref={ref}
        {...otherProps}
      >
        <span data-qx-corner-image data-qx-corner-image-position="rightUp" />
        <span data-qx-corner-image data-qx-corner-image-position="rightDown" />
        <span data-qx-border-image />
        {children}
        <span data-qx-border-image />
        <span data-qx-corner-image data-qx-corner-image-position="leftUp" />
        <span data-qx-corner-image data-qx-corner-image-position="leftDown" />
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section
