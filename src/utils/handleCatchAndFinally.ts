import {Dispatch} from "redux";
import {AllActionsType} from "../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/appReducer";

export const handleCatchAndFinally = (p: Promise<any>, dispatch: Dispatch<AllActionsType>) => {
    p
        .catch(res => {
            dispatch(setAppErrorAC(res))
        })
        .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
}