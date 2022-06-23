import React from 'react'
import { classNames } from '../../../utils/classNames'
import './SocialSignIn.scss'

interface ISocialSignIn {
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'google' | 'facebook'
  text: string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  style?: React.CSSProperties
}

const SocialSignInButtonSettings = {
  google: {
    imgSrc: '/assets/images/icons/google-icon.svg',
    imgAlt: 'Google Icon',
    bgButtonClass: '',
  },
  facebook: {
    imgSrc: '/assets/images/icons/facebook-icon.svg',
    imgAlt: 'Google Icon',
    bgButtonClass: 'socialSignIn__button--bg',
  },
}

const SocialSignIn: React.FC<ISocialSignIn> = ({
  type = 'button',
  variant = 'google',
  text,
  onClick = () => {},
  style,
}): JSX.Element => {
  return (
    <div className="socialSignIn" onClick={onClick} style={style}>
      <button
        className={classNames(
          'socialSignIn__button',
          SocialSignInButtonSettings[variant].bgButtonClass,
        )}
        type={type}
      >
        <span className="socialSignIn__icon">
          <img
            src={SocialSignInButtonSettings[variant].imgSrc}
            alt={SocialSignInButtonSettings[variant].imgAlt}
          />
        </span>
        {text}
      </button>
    </div>
  )
}

export default SocialSignIn
