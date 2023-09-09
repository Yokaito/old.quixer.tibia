import { cn } from '@/sdk/utils/tailwind'
import { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ hasError, className, type, ...otherProps }, ref) => {
    const classnames = cn(
      'input',
      {
        'border border-error focus:outline-0': hasError,
        'focus:outline-0': type === 'checkbox',
      },
      className
    )

    return (
      <input className={classnames} type={type} ref={ref} {...otherProps} />
    )
  }
)

Input.displayName = 'Input'

export default Input
