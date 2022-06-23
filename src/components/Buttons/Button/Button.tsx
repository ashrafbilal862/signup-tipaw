import React from 'react'
import { classNames } from '../../../utils/classNames'
import './Button.scss'

interface IButtonProps {
  type: 'button' | 'submit'
  text?: string
  children?: React.ReactNode
  full?: boolean
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: React.FC<IButtonProps> = ({
  type,
  text,
  children,
  full = false,
  disabled = false,
  onClick = () => {},
}) => {
  const btnText = text || children
  const fullWidthClass = full ? 'button--block' : ''

  return (
    <button
      type={type}
      className={classNames('button', fullWidthClass)}
      disabled={disabled}
      onClick={onClick}
    >
      {btnText}
    </button>
  )
}

export default Button
