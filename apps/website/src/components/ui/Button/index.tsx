import { ButtonHTMLAttributes, forwardRef } from 'react'
import styles from './button.module.scss'

type Variant = 'regular' | 'larger' | 'info' | 'green' | 'red'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specifies the component variant.
   */
  variant?: Variant
}

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
