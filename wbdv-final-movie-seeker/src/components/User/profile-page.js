import React, {useEffect, useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import CommentService from "../../services/comment-service";
import UserService from "../../services/user-service";
import {makeStyles} from "@material-ui/core";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel
  from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import {Link} from "react-router-dom";


const ProfilePage = ({
  currentUser={},
  update,
  logout,
}) =>  {
  const pageStyles = userPageStyles();
  const history = useHistory();

  // States
  const [updateSuccess, setUpdateSuccess] = useState(false)
   const [sessionUser, setSessionUser] = useState({})
  const [comments, setComments] = useState([])
  if(!currentUser.username){
    currentUser = sessionUser;
  }

  useEffect(() => {
    UserService.getCurrentUser()
    .then(user => {
      currentUser = user;
      setSessionUser(user);
     if(!user.username){
       // Alert then force quit
       window.alert("You must login to edit your profile info");
       history.push("/login");
     }
    });

    // get comments from server
    CommentService.getLatest3CommentsForUser(currentUser.username)
    .then(comments => {
     // console.log(comments)
      setComments(comments)
    });
  }, [])

  // Set user profile image based on signup info
  let imageUrl = 'url(https://i.pinimg.com/originals/7a/f8/28/7af8280fc6c75bc2191f4eed895a461d.jpg)'
  if (currentUser.image){
    imageUrl ='url(' + currentUser.image + ')'
  }

  const user_image_style = makeStyles((theme) => ({
    user_image: {
      backgroundImage: imageUrl,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }));
  let imgStyle = user_image_style();

  // Input Refs
  const pwdRef = useRef("pwd");
  const emailRef = useRef("email");
  const addrRef = useRef("addr");
  const userImgRef = useRef("userImgRef");
  const favMovieRef = useRef("favMovieRef");
  const favGenreRef = useRef("favGenreRef");

  //admin setter
  const [adminState, setAdminState] = React.useState(currentUser.isAdmin);

  //gender setter
  const [genderState, setGender] = useState(currentUser.gender);
  const changeGender = (event) => {
    setGender(event.target.value)
  }

  function onClickUpdate() {
    currentUser.address = addrRef.current.value;
    currentUser.email = emailRef.current.value;
    currentUser.gender = genderState;
    currentUser.favMovie = favMovieRef.current.value;
    currentUser.favGenre = favGenreRef.current.value;

    if(userImgRef.current.value){
      currentUser.image = userImgRef.current.value;
    }

    console.log("User to update: ", currentUser)
    update(currentUser, setUpdateSuccess);
    setSessionUser(currentUser)

  }

  function onClickLogout() {
    logout(currentUser);
  }

  function AdminLabelText(){
    if (adminState){
      return "User Is Admin"
    }
    else{
      return "User Is Not Admin"
    }
  }

  return (
      <Grid container component="main" className={pageStyles.root}>
        <CssBaseline />
        <Grid item xs="auto" sm={8} md={5} component={Paper} elevation={6} square>
          <Container component="main" maxWidth="xs">
            <div className={pageStyles.paper}>
              <Avatar className={pageStyles.avatar}>
                <Face />
              </Avatar>
              <Link to="/">
                Home
              </Link>
              <Typography component="h1" variant="h5">
                {currentUser.username}'s Profile
              </Typography>
              <form className={pageStyles.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                        defaultValue={1}
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
                        defaultValue={1}
                        value={currentUser.address}
                        fullWidth
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
                        defaultValue={1}
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
                        defaultValue={1}
                        value={currentUser.favGenre}
                        fullWidth
                        id="favGenre-show"
                        label="Favorite Genre"
                        name="Favorite Genre"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={currentUser.favGenre}
                        variant="outlined"
                        fullWidth
                        name="Favorite Genre"
                        label="New Favorite Genre"
                        type="Favorite Genre"
                        id="favGenre"
                        inputRef={favGenreRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={1}
                        value={currentUser.favMovie}
                        fullWidth
                        name="Favorite Movie"
                        label="Favorite Movie"
                        type="Favorite Movie"
                        id="favMovie-show"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={currentUser.favMovie}
                        variant="outlined"
                        fullWidth
                        name="Favorite Movie"
                        label="New Favorite Movie"
                        type="Favorite Movie"
                        id="favMovie"
                        inputRef={favMovieRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="userImage"
                        label="New Profile Image Link"
                        name="userImage"
                        inputRef = {userImgRef}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    <Radio
                        checked={genderState === 'female'}
                        onChange={changeGender}
                        value="female"
                        name="radio-button-gender"
                    />
                    Female
                  </label>
                  <label>
                    <Radio
                        checked={genderState === 'male'}
                        onChange={changeGender}
                        value="male"
                        name="radio-button-gender"
                        lable="male"
                    />
                    Male
                  </label>
                  <label>
                    <Radio
                        checked={genderState === 'other'}
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
                          control={<Switch checked={adminState} disabled name="isAdmin" />}
                          label={AdminLabelText()}
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={pageStyles.submit}
                    onClick={() => onClickUpdate()}
                >
                  Update Info
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2" onClick={() => onClickLogout()}>
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
        <Grid item xs={false} sm={4} md={7} className={imgStyle.user_image} />
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