import { HTMLAttributes, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './styles.module.scss'

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
      data-qx-modal
      className={`${styles.qxModal} ${className ? className : ''}`}
      {...otherProps}
    >
      {children}
    </div>,
    document.body,
    'modal'
  )
})
