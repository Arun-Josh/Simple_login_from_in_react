import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Paper, CardHeader, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const useStyles = makeStyles({
    root: {

    },
    title: {
        fontSize: 14,
        textAlign: "center"
    }
});

export default function Home(props) {

    const classes = useStyles();
    // const { width, height } = useWindowSize()

    const [state, setState] = useState({
        userid: new URLSearchParams(props.location.search).get("id"),
        userName: "",
        email: ""
    });

    useEffect(()=>{
        Axios.get(`/api/users/profile/${state.userid}`)
            .then(res =>{
                setState(prevState => (
                    {
                        ...prevState, userName: res.data.userName, email: res.data.email
                    }))
            })
            .catch(err=> console.log(err))
    },[])

    return (
        <>  
            {state.userName!==""? <Confetti/>:null}
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

