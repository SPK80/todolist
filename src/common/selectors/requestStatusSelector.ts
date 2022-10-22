import {AppRootStateType} from "app/bll/store";
import {RequestStatusType} from "app/bll/appReducer";

export const requestStatusSelector = () =>
  (state: AppRootStateType): RequestStatusType => state.app.status
