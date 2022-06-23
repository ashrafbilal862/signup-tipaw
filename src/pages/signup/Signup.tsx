import React from 'react'
import { Divider, SocialSignIn } from '../../components'
import SignupForm from './components/SignupForm/SignupForm'
import './signup.scss'

const Signup: React.FC = (): JSX.Element => {
  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__form">
          <h2 className="signup__title">S'inscrire</h2>
          <h3 className="signup__subtitle">
            Rejoignez Tipaw aujourd'hui. C'est gratuit !
          </h3>
          <div className="signup__description">
            Vous êtes un refuge, un éleveur, un vétérinaire ou toiletteur ?
            <a href="#home">Cliquez-ici</a>
          </div>
          <SocialSignIn
            variant="google"
            type="button"
            text="Inscription avec Google"
          />
          <SocialSignIn
            variant="facebook"
            type="button"
            text="Inscription avec Google"
          />
          <Divider />
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default Signup
