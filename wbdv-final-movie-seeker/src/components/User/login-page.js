import React, {useRef} from 'react';
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
import userService from "../../services/user-service";

import {connect} from 'react-redux'
import userAction from '../../actions/user-action'

export const loginStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  user_image: {
    backgroundImage: 'url(https://cdn.hipwallpaper.com/i/37/23/nT8CqZ.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
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

const LoginPage = ({
                     currentUser={
                       username:"not logged in"
                     },
                     login
                   }) => {
  const classes = loginStyles();
  const userRef = useRef("user");
  const pwdRef = useRef("123");

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalMovies />
          </Avatar>
          <h1>
            {currentUser.username}
          </h1>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                inputRef={userRef}
                autoComplete="lname"
            />
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
            <Button
                //href="/profile/1"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  let userName=userRef.current.value
                  let password=pwdRef.current.value
                  login(userName, password)
                }}
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
  );
}

const stpm = (state) => {
  return {
    currentUser: state.userReducer.currentUser
  }
}
const dtpm = (dispatch) => {
  return {
    login: (userName, pwd) => userAction.getUserByCredential(dispatch, userName, pwd)
  }
}

export default connect(stpm, dtpm)(LoginPage)