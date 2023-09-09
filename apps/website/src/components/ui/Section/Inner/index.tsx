import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/sdk/utils/tailwind'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const InnerSection = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    const classnames = cn(
      'flex flex-col gap-4 p-1 border border-tertiary bg-500',
      className
    )

    return (
      <div className="p-1">
        <div ref={ref} className={classnames}>
          {children}
        </div>
      </div>
    )
  }
)

InnerSection.displayName = 'InnerSection'

export default InnerSection
