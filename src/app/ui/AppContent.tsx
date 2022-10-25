import './App.css'
import { useAppSelector } from '../bll/store'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import {
    AppBar,
    Button,
    IconButton,
    LinearProgress,
    Typography,
} from '@mui/material'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import { initializeAppTC, RequestStatusType } from '../bll/appReducer'
import { ErrorSnackbar } from 'common/components/ErrorSnackbar'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { TodoListsList } from 'features/todoLists'
import { Login } from 'features/login'
import { logoutTC } from 'features/login/bll/authReducer'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        user: {
            width: 160,
            display: 'flex',
            justifyContent: 'space-between',
        },
    })
)

export const AppContent: React.FC = () => {
    const requestStatus = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const userData = useAppSelector((state) => state.auth.userData)
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = () => dispatch(logoutTC())
    if (!isInitialized) return <CircularProgress />

    return (
        <div className="App">
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        {isLoggedIn && (
                            <div className={classes.user}>
                                <Typography variant="h6">
                                    {userData?.login}
                                </Typography>
                                <Button
                                    onClick={logoutHandler}
                                    color="inherit"
                                    variant={'outlined'}
                                >
                                    LogOut
                                </Button>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                {requestStatus === RequestStatusType.loading && (
                    <LinearProgress />
                )}
            </div>

            <ErrorSnackbar />
            <Container fixed style={{ margin: 0 }}>
                <Routes>
                    <Route path="/" element={<TodoListsList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </Container>
        </div>
    )
}
