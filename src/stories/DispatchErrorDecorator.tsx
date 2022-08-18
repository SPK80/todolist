import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";
import React from "react";
import {setAppErrorAC} from "../app/appReducer";

export const DispatchErrorDecorator = (storyFn: () => JSX.Element) => {
    const dispatch = useDispatch()
    return <div>
        <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => dispatch(setAppErrorAC('Some error'))}
        >
            Dispatch Error
        </Button>
        {storyFn()}
    </div>
}