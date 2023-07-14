import type { Meta, StoryObj } from '@storybook/react'

import { Wishlist } from './Wishlist'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Wishlist> = {
  component: Wishlist,
}

export default meta
type Story = StoryObj<typeof Wishlist>

export const Default: Story = {
  args: {
    size: 56,
  },
}
