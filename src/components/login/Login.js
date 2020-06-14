import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, Paper, CardHeader, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

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
    const [state, setState] = useState({
            registerRedirect : false,
            homeRedirect : false
    });
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
                                    <TextField id="outlined-basic" fullWidth={true} label="User name" variant="outlined"/>
                                    <br/>
                                    <br/>
                                    <TextField id="outlined-basic" fullWidth={true} label="Password" variant="outlined" />
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="secondary">
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