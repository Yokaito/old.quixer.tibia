import { LinkHTMLAttributes, forwardRef } from 'react'
import styles from '../button.module.scss'

type Variant = 'regular' | 'larger' | 'info' | 'green' | 'red'

interface ButtonLinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
  /**
   * Specifies the component variant.
   */
  variant?: Variant
  /**
   *  Specifies the text content of the component.
   */
  text: string
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function Button({ variant = 'regular', text, className, ...props }, ref) {
    return (
      <a
        ref={ref}
        data-qx-button
        data-qx-button-link
        data-qx-button-variant={variant}
        className={`${styles.qxButton} ${
          className ? className : ''
        } fondamentoTitle`}
        {...props}
      >
        <span>{text}</span>
      </a>
    )
  }
)

export default ButtonLink
