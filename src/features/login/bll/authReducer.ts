import {Dispatch} from 'redux'
import {AppActionsType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "app/bll/appReducer";
import {authApi, LoginDataType} from "../dal/authApi";

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
type AuthStateType = typeof initialState

const initialState = {
  isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({
  type: 'login/SET-IS-LOGGED-IN',
  value,
} as const)

// thunks
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
  console.log(data)
  dispatch(setAppStatusAC(RequestStatusType.loading))
  authApi.login(data)
    .then(res => {
      console.log(res)
      dispatch(setIsLoggedInAC(true))
    })
    .catch(res => {
      console.log(res)
      dispatch(setAppErrorAC(res))
    })
    .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
}
