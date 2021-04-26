import React, {useReducer, useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddToQueue from '@material-ui/icons/AddToQueue';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {userPageStyles} from './login-page';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import userService from '../../services/user-service'
import { useHistory } from "react-router-dom";
import TopBar from "../top-bar";

export default function SignUpPage() {
  const history = useHistory()
  const classes = userPageStyles();
  const userRef = useRef("user");
  const pwdRef = useRef("pwd");
  const emailRef = useRef("email");
  const addrRef = useRef("addr");
  const favMovieRef = useRef("");
  const favGenreRef = useRef("");
  const imageRef = useRef("");

  //admin setter
  const [adminState, setAdminState] = React.useState({
    isAdmin: false,
  });
  const handleChange = (event) => {
    setAdminState({ ...adminState, [event.target.name]: event.target.checked });
  };

  //gender setter
  const [gender, setGender] = useState("female");
  const changeGender = (event) => {
    setGender(event.target.value)
  }

  return (
      <>
      <Grid container spacing={3}>
          <Grid item xs={12}>
              <TopBar currentUser={{username: ""}} headingText="Sign Up" />
          </Grid>
      </Grid>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddToQueue />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
                    id="email"
                    label="Email Address"
                    name="email"
                    inputRef={emailRef}
                    autoComplete="email"
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
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="address"
                    label="Address"
                    type="address"
                    id="address"
                    inputRef={addrRef}
                    autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="Favorite Genre"
                    label="Favorite Genre"
                    type="Favorite Genre"
                    id="favGenre"
                    inputRef={favGenreRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="Favorite Movie"
                    label="Favorite Movie"
                    type="Favorite Movie"
                    id="favMovie"
                    inputRef={favMovieRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Image"
                    label="Profile Image Link"
                    id="image"
                    inputRef={imageRef}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <label>
                <Radio
                    checked={gender === 'female'}
                    onChange={changeGender}
                    value="female"
                    name="radio-button-gender"
                />
                Female
              </label>
              <label>
                <Radio
                    checked={gender === 'male'}
                    onChange={changeGender}
                    value="male"
                    name="radio-button-gender"
                    lable="male"
                />
                Male
              </label>
              <label>
                <Radio
                    checked={gender === 'other'}
                    onChange={changeGender}
                    value="other"
                    name="radio-button-gender"
                    lable="other"
                />
                Other
              </label>
            </Grid>
            <Grid>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                      control={<Switch checked={adminState.isAdmin} onChange={handleChange} name="isAdmin" />}
                      label="Create as Admin User"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  console.log("registered admin state: ", adminState)
                    userService.register({
                        username: userRef.current.value,
                        password: pwdRef.current.value,
                        address:  addrRef.current.value,
                        email: emailRef.current.value,
                        isAdmin: adminState,
                        gender: gender,
                        favMovie: favMovieRef.current.value,
                        favGenre: favGenreRef.current.value,
                        image: imageRef.current.value
                    }).then(
                        user => console.log("registeredUser: ", user)
                    );
                  history.push("/login");
                }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
        </>
  );
}