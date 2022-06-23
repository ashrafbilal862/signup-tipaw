import * as Yup from 'yup'

const passwordPatterns = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/]

const validatePassword = (value: string | undefined) =>
  passwordPatterns.every((pattern) => pattern.test(value || ''))

export interface ISignupForm {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export const initialValues: ISignupForm = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required!'),
  lastName: Yup.string().required('Last Name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Please add a valid email!'),
  phoneNumber: Yup.string().required('Phone Number is required!'),
  terms: Yup.bool().oneOf([true], 'Accept terms and condition'),
  password: Yup.string()
    .required('Password is required!')
    .test(
      'password-validation',
      'Password should contain at least one uppercase, one lowercase and special character',
      validatePassword,
    ),
  confirmPassword: Yup.string()
    .required('Password is required!')
    .test(
      'password-validation',
      'Password should contain at least one uppercase, one lowercase and special character',
      validatePassword,
    )
    .oneOf([Yup.ref('password')], 'Password must match'),
})
