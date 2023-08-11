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
        <span data-fs-corner-image data-fs-corner-image-position="rightUp" />
        <span data-fs-corner-image data-fs-corner-image-position="rightDown" />
        <span data-fs-border-image />
        {children}
        <span data-fs-border-image />
        <span data-fs-corner-image data-fs-corner-image-position="leftUp" />
        <span data-fs-corner-image data-fs-corner-image-position="leftDown" />
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section
