import React, { useReducer } from 'react'
import { useFormik } from 'formik'
import { initialValues, ISignupForm, validationSchema } from './initialValues'
import { Button, Input } from '../../../../components'
import './SignupForm.scss'
import { _get } from '../../../../utils/fucntions'
import { ActionTypes, initialState, reducer } from './reducer'
import { useMutation, gql } from '@apollo/client'

const ADD_NEW_USER = gql`
  mutation register(
    $firstName: string
    $lastName: string
    $phoneNumber: string
    $email: string
    $password: string
    $acceptedTerms: boolean
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      password: $password
      acceptedTerms: $acceptedTerms
    ) {
      user {
        firstName
        lastName
      }
      tokens {
        access {
          token
        }
      }
    }
  }
`

const SignupForm = () => {
  const [signup] = useMutation(ADD_NEW_USER)
  const {
    handleSubmit,
    getFieldProps,
    isValid,
    isSubmitting,
    dirty,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  async function onSubmit(values: ISignupForm) {
    const response = await signup({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
        acceptedTerms: values.terms,
      },
    })

    console.log(response.data)
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleViewPassword = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    if (!values.password) return
    dispatch({ type: ActionTypes.Password, payload: !state.viewPassword })
  }

  const handleViewConfirmPassword = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    if (!values.confirmPassword) return
    dispatch({
      type: ActionTypes.ConfirmPassword,
      payload: !state.viewConfirmPassword,
    })
  }

  return (
    <div className="signupForm">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="firstName"
          required
          label="First Name"
          {...getFieldProps('firstName')}
          error={
            _get(touched, 'firstName', false) &&
            !!_get(errors, 'firstName', false)
          }
          helperText={
            _get(touched, 'firstName', false) && _get(errors, 'firstName', '')
          }
        />
        <Input
          type="text"
          id="lastName"
          required
          label="Last Name"
          {...getFieldProps('lastName')}
          error={
            _get(touched, 'lastName', false) &&
            !!_get(errors, 'lastName', false)
          }
          helperText={
            _get(touched, 'lastName', false) && _get(errors, 'lastName', '')
          }
        />
        <Input
          type="text"
          id="phoneNumber"
          required
          label="Phone Number"
          {...getFieldProps('phoneNumber')}
          error={
            _get(touched, 'phoneNumber', false) &&
            !!_get(errors, 'phoneNumber', false)
          }
          helperText={
            _get(touched, 'phoneNumber', false) &&
            _get(errors, 'phoneNumber', '')
          }
        />
        <Input
          type="text"
          id="email"
          required
          label="Email Address"
          {...getFieldProps('email')}
          error={
            _get(touched, 'email', false) && !!_get(errors, 'email', false)
          }
          helperText={
            _get(touched, 'email', false) && _get(errors, 'email', '')
          }
        />
        <Input
          type="password"
          id="password"
          required
          label="Password"
          {...getFieldProps('password')}
          error={
            _get(touched, 'password', false) &&
            !!_get(errors, 'password', false)
          }
          helperText={
            _get(touched, 'password', false) && _get(errors, 'password', '')
          }
          onClick={handleViewPassword}
          showPassword={state.viewPassword}
        />
        <Input
          type="password"
          id="confirmPassword"
          required
          label="Confirm Password"
          {...getFieldProps('confirmPassword')}
          error={
            _get(touched, 'confirmPassword', false) &&
            !!_get(errors, 'confirmPassword', false)
          }
          helperText={
            _get(touched, 'confirmPassword', false) &&
            _get(errors, 'confirmPassword', '')
          }
          showPassword={state.viewConfirmPassword}
          onClick={handleViewConfirmPassword}
        />
        <div className="signupForm__checkbox">
          <input type="checkbox" id="terms" {...getFieldProps('terms')} />
          <label htmlFor="terms">
            J'ai lu et accepté les conditions générales d'utilisation de Tipaw
          </label>
        </div>
        <div className="signupForm__signup-button">
          <Button
            type="submit"
            text="Signup"
            full
            disabled={!(isValid && dirty) || isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}

export default SignupForm
