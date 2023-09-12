import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './index'

describe('Button', () => {
  it('should render', async () => {
    const label = 'test button'
    render(<Button label={label} />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
