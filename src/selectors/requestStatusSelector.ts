import {AppRootStateType} from "../app/store";
import {RequestStatusType} from "../app/appReducer";

export const requestStatusSelector = () =>
    (state: AppRootStateType): RequestStatusType =>
        state.app.status