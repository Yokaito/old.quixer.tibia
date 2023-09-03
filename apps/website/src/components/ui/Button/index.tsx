import { ButtonHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

type Variant = 'regular' | 'larger' | 'info' | 'green' | 'red'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specifies the component variant.
   */
  variant?: Variant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, children, className, ...props }, ref) {
    const classname = classNames({
      ["bg-[url('../assets/images/buttons/button_red.gif')]"]:
        variant === 'red',
      ["bg-[url('../assets/images/buttons/button_green.gif')]"]:
        variant === 'green',
      ["bg-[url('../assets/images/buttons/button_blue.gif')]"]:
        variant === 'info',
      ["bg-[url('../assets/images/buttons/button.webp')]"]:
        variant === 'regular',
      ["bg-[url('../assets/images/buttons/button-extend.webp')]"]:
        variant === 'larger',
      'w-[135px] h-[25px] text-sm':
        variant === 'red' || variant === 'info' || variant === 'green',
      'w-[142px] h-[34px] px-2 text-base': variant === 'regular',
      'w-[150px] h-[34px] px-2 text-base': variant === 'larger',
    })

    return (
      <button
        className={`p-0 capitalize transition-all bg-transparent border-none
        cursor-pointer line-clamp-1 disabled:cursor-not-allowed disabled:opacity-80 text-black
        hover:filter-hover fondamento-title  ${classname} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default Button
