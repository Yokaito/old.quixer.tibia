import React from 'react'
import { render } from '@testing-library/react'

import Wishlist from './Wishlist'

describe('Wishlist', () => {
  test('renders Wishlist component', () => {
    render(<Wishlist subscribed />)
  })

  test('render Wishlist with custom width and height', () => {
    render(<Wishlist width={100} height={100} />)
  })
})
