//=======types==========================================================================================================

import {authApi} from "features/login/dal/authApi";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "features/login/bll/authReducer";

export enum RequestStatusType {
  idle,
  loading,
  // succeeded,
  // failed,
}

export type AppStateType = {
  status: RequestStatusType
  error: string | null
}

export type AppActionsType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

//=======reducer========================================================================================================

const initialState: AppStateType = {
  status: RequestStatusType.idle,
  error: null,
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authApi.me().then(res => {
    dispatch(setIsLoggedInAC(true));
  })
}
