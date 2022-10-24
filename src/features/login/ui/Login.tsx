import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {useFormik} from "formik";
import {loginTC} from "../bll/authReducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "app/bll/store";
import {RequestStatusType} from "app/bll/appReducer";
import {Navigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
}

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const requestStatus = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email)
                errors.email = 'Required'
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                errors.email = 'Invalid email address'

            if (!values.password)
                errors.password = 'Required'
            else if (values.password.length < 3)
                errors.password = 'Password is too short'
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.values.email = ''
            formik.values.password = ''
            formik.values.rememberMe = false
        },
    })

    const submitDisabled =
        !!formik.errors.email
        || !!formik.errors.password
        || (!formik.touched.email && !formik.touched.password)
        || requestStatus === RequestStatusType.loading

    if (isLoggedIn) return <Navigate to={'/'}/>

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                    name='rememberMe'
                                    checked={formik.values.rememberMe}
                                    onChange={formik.handleChange}
                                />}
                            />
                            <Button
                                disabled={submitDisabled}
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
