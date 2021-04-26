import React, {useRef, useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LocalMovies from '@material-ui/icons/LocalMovies';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import TopBar from "../top-bar";

import {connect} from 'react-redux'
import userAction from '../../actions/user-action'
import Alert from "@material-ui/lab/Alert";

export const userPageStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const notLoggedInUserName = "please log in";

const LoginPage = ({
                     currentUser={
                       username:notLoggedInUserName
                     },
                     login
                   }) => {
  const [showLoginFail, setShowLoginFail] = useState(false)
  const classes = userPageStyles();
  const userRef = useRef("user");
  const pwdRef = useRef("pwd");
  const history = useHistory()
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    if (loginSuccess) {
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

      sleep(1000).then(() => {
        goToProfile()
      })
    }
  }, [loginSuccess]);

  function onClickLogin() {
    let userName=userRef.current.value;
    let password=pwdRef.current.value;
    login(userName, password, setLoginSuccess, setShowLoginFail);
  }

  const goToProfile = () => {
    const profilePath = '/profile';
    history.push(profilePath);
  }

  return (
      <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopBar currentUser={{username: ""}} headingText="Sign In" />
        </Grid>
      </Grid>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalMovies />
          </Avatar>
          {
            loginSuccess && <Alert severity="success">Login succeeded!</Alert>
          }
          {
            showLoginFail && <Alert severity="error">Login failed! No matched username and password!</Alert>
          }
          <Typography component="h1" variant="h4">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    inputRef={userRef}
                    autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    inputRef={pwdRef}
                    autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => onClickLogin()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
        </>
  );
}

const stpm = (state) => {
  return {
    currentUser: state.userReducer.currentUser
  }
}
const dtpm = (dispatch) => {
  return {
    login: (userName, pwd, setLoginSuccess, setShowLoginFail) => {
      userAction.getUserByCredential(dispatch, userName, pwd, setLoginSuccess, setShowLoginFail)
    }
  }
}

export default connect(stpm, dtpm)(LoginPage)