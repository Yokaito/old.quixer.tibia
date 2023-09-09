import classNames from 'classnames'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ hasError, className, type, ...otherProps }, ref) => {
    const classMerged = twMerge('input', className)
    const classWithConditions = classNames(classMerged, {
      'border border-error focus:outline-0': hasError,
      'focus:outline-0': type === 'checkbox',
    })

    return (
      <input
        className={classWithConditions}
        type={type}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
