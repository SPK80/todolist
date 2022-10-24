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
    dispatch(setAppStatusAC(RequestStatusType.loading))
    authApi.login(data)
        .then(res => dispatch(setIsLoggedInAC(true)))
        .catch(res => dispatch(setAppErrorAC(res)))
        .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
}

export const logoutTC = () => (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    authApi.logout()
        .then(res => dispatch(setIsLoggedInAC(false)))
        .catch(res => dispatch(setAppErrorAC(res)))
        .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
}