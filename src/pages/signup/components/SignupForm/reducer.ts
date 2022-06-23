interface IState {
  viewPassword: boolean
  viewConfirmPassword: boolean
}

export enum ActionTypes {
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

interface IActionPayload {
  type: ActionTypes
  payload: boolean
}

export const initialState = { viewPassword: false, viewConfirmPassword: false }

export const reducer = (
  state: IState = initialState,
  action: IActionPayload,
) => {
  switch (action.type) {
    case ActionTypes.Password:
      return { ...state, viewPassword: action.payload }
    case ActionTypes.ConfirmPassword:
      return { ...state, viewConfirmPassword: action.payload }
    default:
      return state
  }
}
