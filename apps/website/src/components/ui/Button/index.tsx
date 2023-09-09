import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/sdk/utils/tailwind'

type Variant = 'regular' | 'larger' | 'info' | 'green' | 'red'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specifies the component variant.
   */
  variant?: Variant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, children, className, ...props }, ref) {
    const classname = cn({
      ["bg-[url('../assets/images/buttons/button_red.gif')] fondamento-title"]:
        variant === 'red',
      ["bg-[url('../assets/images/buttons/button_green.gif')] fondamento-title"]:
        variant === 'green',
      ["bg-[url('../assets/images/buttons/button_blue.gif')] fondamento-title"]:
        variant === 'info',
      ["bg-[url('../assets/images/buttons/button.webp')] fondamento-title"]:
        variant === 'regular',
      ["bg-[url('../assets/images/buttons/button-extend.webp')] fondamento-title"]:
        variant === 'larger',
      'w-[135px] h-[25px] text-sm':
        variant === 'red' || variant === 'info' || variant === 'green',
      'w-[142px] h-[34px] px-2 text-base fondamento-title':
        variant === 'regular',
      'w-[150px] h-[34px] px-2 text-base fondamento-title':
        variant === 'larger',
    })

    return (
      <button
        className={`p-0 capitalize transition-all bg-transparent border-none
        cursor-pointer line-clamp-1 disabled:cursor-not-allowed disabled:opacity-80 text-black
        hover:filter-hover ${classname} ${className} `}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default Button
