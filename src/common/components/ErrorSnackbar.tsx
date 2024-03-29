import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from "app/bll/store";
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "app/bll/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
});

export const ErrorSnackbar: React.FC = React.memo(() => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useDispatch()
    // console.log('ErrorSnackbar', error)
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(setAppErrorAC(null))
    }
    
    return (
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
              {error}
          </Alert>
      </Snackbar>
    )
})
