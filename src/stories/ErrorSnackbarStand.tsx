import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";
import {setAppErrorAC} from "../app/bll/appReducer";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar";

export const ErrorSnackbarStand: React.FC = () => {
	const dispatch = useDispatch()
	return <div>
		<Button
			variant={"contained"}
			color={"primary"}
			onClick={() => dispatch(setAppErrorAC('Some error'))}
		>
			Dispatch Error
		</Button>
		<ErrorSnackbar/>
	</div>
}
