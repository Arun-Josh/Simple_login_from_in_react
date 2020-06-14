import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Paper, CardHeader, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const useStyles = makeStyles({
    root: {

    },
    title: {
        fontSize: 14,
        textAlign: "center"
    }
});

export default function Home() {

    const classes = useStyles();

    const [state, setState] = useState({
        userName: "Dragon",
        email: "dragon@dragoninc.com"
    });

    useEffect(()=>{
        Axios.get('/profile/')
            .then(res =>{

            })
            .catch(err=> console.log(err))
    },[])

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
                                title="Profile"
                            />
                            <CardContent>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField fullWidth={true} label="User name" value={state.userName} variant="outlined" />
                                    <br />
                                    <br />
                                    <TextField fullWidth={true} label="Email" value={state.email} variant="outlined" />
                                    <br />
                                </form>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

