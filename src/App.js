import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import background from './imgs/4.jpg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  background : {
    backgroundImage:`url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className={classes.background} >
      <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
