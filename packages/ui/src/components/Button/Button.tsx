import React from 'react'
import classnames from 'classnames'
import './Button.scss'

interface ButtonProps {
  label: string
}

export const Button = ({ label }: ButtonProps) => {
  const buttonClass = classnames('qx-button')

  return (
    <>
      <button className={buttonClass}>{label}</button>
    </>
  )
}

export default Button
