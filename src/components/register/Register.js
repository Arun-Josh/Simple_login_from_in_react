import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, Paper, CardHeader, TextField } from "@material-ui/core";
import Axios from 'axios'
import { useSnackbar } from 'notistack';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
    root: {

    },
    title: {
        fontSize: 14,
        textAlign: "center"
    },
    registerBtn : {
        background: "#ff9800",
        color:"white",
        '&:hover': {
            background: "#b26a00",
         },
    }
});

export default function Register() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [state, setState] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPass: "",
        loginRedirect: false
    });

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePassword = () => {
        if (state.password !== state.confirmPass) {
            enqueueSnackbar("Password and confirm password doesn't match", {
                variant: 'error',
            });
            return false;
        }
        return true;
    }

    const validateInputs = () => {
        if (state.userName === "") {
            enqueueSnackbar("User name is mandatory", {
                variant: 'error',
            });
            return false;
        }
        if (state.email === "") {
            enqueueSnackbar("User email is mandatory", {
                variant: 'error',
            });
            return false;
        }
        if (!validateEmail(state.email)) {
            enqueueSnackbar("Enter proper email", {
                variant: 'error',
            });
            return false;
        }
        if (state.password === "") {
            enqueueSnackbar("Password is mandatory", {
                variant: 'error',
            });
            return false;
        }
        return validatePassword();
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        setState(prevState => (
            {
                ...prevState, userName: value
            }))
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setState(prevState => (
            {
                ...prevState, email: value
            }))
    }

    const handlePassChange = (e) => {
        const value = e.target.value;
        setState(prevState => (
            {
                ...prevState, password: value
            }))
    }

    const handleConfirmPassChange = (e) => {
        const value = e.target.value;
        setState(prevState => (
            {
                ...prevState, confirmPass: value
            }))
    }

    const handleRegisteration = () => {
        if (validateInputs()) {
            Axios.post('/api/register', state)
                .then(res => {
                    console.log(res)
                    if (res.data === "success") {
                        enqueueSnackbar("Registered Successfully", {
                            variant: 'success',
                        });
                        setState(prevState => (
                            {
                                ...prevState, loginRedirect: true
                            }
                        ))
                    }
                })
                .catch(err => {
                    enqueueSnackbar("Something went wrong :(", {
                        variant: 'error',
                    });
                })
        }
    }

    return (
        <>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Paper elevation={3} >
                        <Card className={classes.root}>
                            <CardHeader
                                className={classes.title}
                                title="Registration Form"
                            />
                            <CardContent>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField fullWidth={true} label="User name" onChange={handleNameChange} variant="outlined" />
                                    <br />
                                    <br />
                                    <TextField fullWidth={true} label="Email" onChange={handleEmailChange} variant="outlined" />
                                    <br />
                                    <br />
                                    <TextField fullWidth={true} type="password" onChange={handlePassChange} label="Password" variant="outlined" />
                                    <br />
                                    <br />
                                    <TextField fullWidth={true} type="password" onChange={handleConfirmPassChange} label="Confirm Password" variant="outlined" />
                                    <br />
                                </form>
                            </CardContent>
                            <CardActions>
                                <Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" className={classes.registerBtn} onClick={handleRegisteration}>
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>

            {/* Redirects */}
            {state.loginRedirect ? <Redirect to={"/login"} /> : null};

        </>
    );
} 