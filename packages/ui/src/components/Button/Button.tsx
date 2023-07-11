import React from 'react'
import classnames from 'classnames'
import './Button.scss'

export const Button = () => {
  const [count, setCount] = React.useState(1)

  const buttonClass = classnames('qx-button', {
    'qx-button--active': count >= 5,
  })

  const buttonClassDecrement = classnames('qx-button', {
    'qx-button--active': count < 5,
  })

  return (
    <>
      <button className={buttonClass} onClick={() => setCount(count + 1)}>
        Increment {count}
      </button>
      <button
        className={buttonClassDecrement}
        onClick={() => setCount(count - 1)}
      >
        Decrement {count}
      </button>
    </>
  )
}

export default Button
