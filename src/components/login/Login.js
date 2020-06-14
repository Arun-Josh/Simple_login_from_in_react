import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, Paper, CardHeader, TextField } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
    root: {

    },
    title: {
        // fontSize: 14,
        textAlign: "center"
    }
});

export default function Login() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [state, setState] = useState({
            email: "",
            password: "",
            registerRedirect : false,
            homeRedirect : false
    });


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

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
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
        return true;        
    }

    const handleLogin = () => {
        if(validateInputs()){
            let payload = {}
            payload.email = state.email;
            payload.password = state.password
            Axios.post('/auth', payload)
                .then(res => {

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
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12}>
                    <Paper elevation={3} >
                        <Card className={classes.root}>
                            <CardHeader
                                className={classes.title}
                                title="Sign up"
                            />
                            <CardContent>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField fullWidth={true} onChange={handleEmailChange} label="Email" variant="outlined"/>
                                    <br/>
                                    <br/>
                                    <TextField fullWidth={true} onChange={handlePassChange} label="Password" variant="outlined" />
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="secondary" onClick={handleLogin}>
                                    Login
                                </Button>
                                <Button variant="contained" color="primary" onClick={ () => { setState(prevState => ({ ...prevState, registerRedirect:true })) }}>
                                    Register
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>

            {/* Redirects */}
            {state.registerRedirect ? <Redirect to={"/register"} /> : null};
            {state.homeRedirect     ? <Redirect to={"/home"} /> : null};

        </>
    );
} 