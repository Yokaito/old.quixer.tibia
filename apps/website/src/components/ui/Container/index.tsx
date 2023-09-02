import { HTMLAttributes, forwardRef } from 'react'
import styles from './container.module.scss'
import Image from 'next/image'
import CloseButtonImg from '@/assets/images/buttons/icon-cancel-over.png'
import { Button } from '..'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  onClose?: () => void
}

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ children, title, className, onClose, ...otherProps }, ref) => {
    return (
      <div
        className={`${styles.qxContainer} ${className ? className : ''}`}
        ref={ref}
        {...otherProps}
      >
        <header data-qx-container-header>
          <span data-qx-container-border="top" />
          <span data-qx-container-border="right" />
          <span data-qx-container-corner="rightUp"></span>
          <span data-qx-container-corner="rightDown"></span>
          <div data-qx-container-title-wrapper>
            <h1 data-qx-container-header-title>{title}</h1>
            {onClose && (
              <Button data-qx-container-close onClick={onClose}>
                <Image src={CloseButtonImg} alt="close" />
              </Button>
            )}
          </div>
          <span data-qx-container-border="bottom" />
          <span data-qx-container-border="left" />
          <span data-qx-container-corner="leftUp"></span>
          <span data-qx-container-corner="leftDown"></span>
        </header>
        <div data-qx-container-content>{children}</div>
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container
