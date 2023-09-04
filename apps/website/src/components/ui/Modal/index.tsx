import { HTMLAttributes, forwardRef } from 'react'
import { createPortal } from 'react-dom'

interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean
}

export const Modal = forwardRef<HTMLDivElement, Props>(function Modal(
  { open, children, className, ...otherProps },
  ref
) {
  if (!open) return null

  return createPortal(
    <div
      id="modal"
      ref={ref}
      className={`${className} fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center`}
      {...otherProps}
    >
      <div className="min-w-[320px] max-w-[320px] md:min-w-[480px] md:max-w-[480px]">
        {children}
      </div>
    </div>,
    document.body,
    'modal'
  )
})
