import React from 'react'
import { PasswordEyeIcon } from './icons'
import './Input.scss'

interface IInputProps {
  type: 'text' | 'password' | 'email'
  id: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
  error?: boolean
  helperText?: string | undefined
  showPassword?: boolean
  onChange?: (event: React.InputHTMLAttributes<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

interface IErrorMessageProps {
  id: string
  helperText: string | undefined
  show: boolean
}

const InputIcons: { [key: string]: JSX.Element } = {
  password: <PasswordEyeIcon />,
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({
  id,
  helperText,
  show,
}) => {
  if (!show) return null

  return (
    <p id={id} className="input__error-msg">
      {helperText}
    </p>
  )
}

const Input: React.FC<IInputProps> = ({
  type,
  id,
  name,
  label,
  placeholder,
  required = false,
  error = false,
  helperText,
  showPassword,
  onChange = () => {},
  onBlur = () => {},
  onClick = () => {},
}): JSX.Element => {
  const newInputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>
        {label} <span>{required && '*'}</span>
      </label>
      <div className="input__container">
        <input
          className="input__control"
          type={newInputType}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          aria-describedby={id}
          aria-invalid={error}
        />
        <div className="input__icon" onClick={onClick}>
          {InputIcons[type]}
        </div>
      </div>
      <ErrorMessage
        id={id}
        helperText={helperText}
        show={error && !!helperText}
      />
    </div>
  )
}

export default Input
