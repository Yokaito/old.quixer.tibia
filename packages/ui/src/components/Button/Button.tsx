import React from 'react'
import classnames from 'classnames'

interface ButtonProps {
  label: string
}

export const Button = ({ label }: ButtonProps) => {
  const buttonClass = classnames('qx-button')

  return (
    <>
      <button
        className={`${buttonClass} text-slate-700 border border-slate-700 rounded-xl px-4 py-1 transition-all hover:text-white hover:bg-slate-700 duration-200`}
      >
        {label}
      </button>
    </>
  )
}

export default Button
