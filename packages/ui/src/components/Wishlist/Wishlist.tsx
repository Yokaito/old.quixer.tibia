import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'
import './Wishlist.scss'

interface WishlistProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  subscribed?: boolean
  size?: number
  height?: number
  width?: number
  dataTestId?: string
}

export const Wishlist = forwardRef<HTMLButtonElement, WishlistProps>(
  function Wishlist(
    {
      subscribed = false,
      size = 20,
      dataTestId = 'wishlist-test-id',
      height,
      width,
      className,
      'aria-label': ariaLabel = 'Add to wishlist',
      ...otherProps
    },
    ref
  ) {
    const wishlistClass = classNames('qx-wishlist', className, {
      'qx-wishlist--subscribed': subscribed,
    })

    return (
      <button
        ref={ref}
        {...otherProps}
        className={wishlistClass}
        data-testid={dataTestId}
        aria-label={ariaLabel}
        style={{
          width: (width && height) || size,
          height: (width && height) || size,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          viewBox="0 0 256 256"
        >
          <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z" />
        </svg>
      </button>
    )
  }
)

export default Wishlist
