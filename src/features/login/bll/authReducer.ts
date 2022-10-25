import { Dispatch } from 'redux'
import {
    AppActionsType,
    RequestStatusType,
    setAppErrorAC,
    setAppStatusAC,
} from 'app/bll/appReducer'
import { authApi, AuthResponseDataType, LoginDataType } from '../dal/authApi'

// types

type AuthStateType = typeof initialState

export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserDataAC>

const initialState = {
    isLoggedIn: false,
    userData: null as AuthResponseDataType | null,
}

export const authReducer = (
    state: AuthStateType = initialState,
    action: AuthActionsType
): AuthStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'login/SET-USER-DATA':
            return { ...state, userData: action.userData }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({
        type: 'login/SET-IS-LOGGED-IN',
        isLoggedIn,
    } as const)

export const setUserDataAC = (userData: AuthResponseDataType | null) =>
    ({
        type: 'login/SET-USER-DATA',
        userData,
    } as const)

// thunks
export const loginTC =
    (data: LoginDataType) =>
    (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
        dispatch(setAppStatusAC(RequestStatusType.loading))
        authApi
            .login(data)
            .then(() => {
                debugger
                authApi
                    .me()
                    .then((res) => {
                        dispatch(setUserDataAC(res))
                        dispatch(setIsLoggedInAC(true))
                    })
                    .catch((res) => dispatch(setAppErrorAC(res)))
            })
            .catch((res) => dispatch(setAppErrorAC(res)))
            .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
    }

export const logoutTC =
    () => (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
        dispatch(setAppStatusAC(RequestStatusType.loading))
        authApi
            .logout()
            .then(() => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setUserDataAC(null))
            })
            .catch((res) => dispatch(setAppErrorAC(res)))
            .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
    }
