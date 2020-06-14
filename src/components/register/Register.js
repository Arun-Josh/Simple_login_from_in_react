import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, Paper, CardHeader, TextField } from "@material-ui/core";
import Axios from 'axios'
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
    root: {

    },
    title: {
        fontSize: 14,
        textAlign: "center"
    }
});

export default function Register() {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [state, setState] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPass: ""
    });

    const validatePassword = () => {
        if (state.pass !== state.confirmPass) {
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
        if (state.userName === "") {
            enqueueSnackbar("Password is mandatory", {
                variant: 'error',
            });
            return false;
        }
        return validatePassword();
    }

    const handleRegisteration = () => {

        if (validateInputs) {
            Axios.post('/api/register', state)
                .then(res => {
                    console.log(res)
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
                                    <TextField fullWidth={true} label="User name" variant="outlined" />
                                    <br />
                                    <br />
                                    <TextField fullWidth={true} label="Email" variant="outlined" />
                                    <br />
                                    <br />
                                    <TextField fullWidth={true} type="password" label="Password" variant="outlined" />
                                    <br />
                                    <br />
                                    <TextField fullWidth={true} type="password" label="Confirm Password" variant="outlined" />
                                    <br />
                                </form>
                            </CardContent>
                            <CardActions>
                                <Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" onClick={handleRegisteration}>
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
} 