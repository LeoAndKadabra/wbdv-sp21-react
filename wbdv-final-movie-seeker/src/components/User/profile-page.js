import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {userPageStyles} from './login-page';
import Face from '@material-ui/icons/Face';
import Container from '@material-ui/core/Container';
import userAction from "../../actions/user-action";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";


const notLoggedInUserName = "not logged in";
const ProfilePage = ({
  currentUser={
    username: notLoggedInUserName
  },
  update,
  logout,
}) =>  {
  const classes = userPageStyles();
  const history = useHistory();

  const pwdRef = useRef("pwd");
  const emailRef = useRef("email");
  const addrRef = useRef("addr");

  const [updateSuccess, setUpdateSuccess] = useState(false)

  function onClickUpdate() {
      //password: pwdRef.current.value,
    currentUser.address = addrRef.current.value;
    currentUser.email = emailRef.current.value;

    //console.log("User to update: ", currentUser)
    update(currentUser, setUpdateSuccess);

  }

  function onClickLogout() {
    logout(currentUser);
  }

  return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs="auto" sm={8} md={5} component={Paper} elevation={6} square>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <Face />
              </Avatar>
              <a href="/search">
                 Search Movie
              </a>
              <Typography component="h1" variant="h5">
                {currentUser.username}'s Profile
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                        value={currentUser.username}
                       // disabled
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={currentUser.address}
                        fullWidth
                       // disabled
                        id="homeAddress-show"
                        label="Home Address"
                        name="homeAddress"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={currentUser.address}
                        variant="outlined"
                        fullWidth
                        id="homeAddress"
                        label="New Home Address"
                        name="homeAddress"
                        autoComplete="address"
                        inputRef = {addrRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={currentUser.email}
                        fullWidth
                        //disabled
                        id="email-show"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={currentUser.email}
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="New Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef = {emailRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value="123456" //TODO: fix after can get password from BE
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password-show"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={currentUser.password}
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef = {pwdRef}
                    />
                  </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => onClickUpdate()}
                >
                  Update Info
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2" onClick={() => onClickLogout()}>
                      Log out
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.user_image} />
      </Grid>
  );
}

const stpm = (state) => {
  return {
    currentUser: state.userReducer.currentUser
  }
}
const dtpm = (dispatch) => {
  return {
    update: (user, setUpdateSuccess) => userAction.updateUser(user, dispatch, setUpdateSuccess),
    logout: (user) => userAction.clearCurrentUser(user, dispatch)
  }
}

export default connect(stpm, dtpm)(ProfilePage)