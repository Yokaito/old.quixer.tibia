import { ButtonHTMLAttributes, forwardRef } from 'react'
import styles from './button.module.scss'
import Link from 'next/link'

type Variant = 'regular' | 'larger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specifies the component variant.
   */
  variant?: Variant
}

type Ref = HTMLButtonElement

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'regular', children, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        data-qx-button
        data-qx-button-variant={variant}
        className={`${styles.qxButton} ${
          className ? className : ''
        } fondamentoTitle`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default Button
