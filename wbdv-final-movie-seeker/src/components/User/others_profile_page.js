import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {userPageStyles} from './login-page';
import Face from '@material-ui/icons/Face';
import Container from '@material-ui/core/Container';
import { useHistory, withRouter } from "react-router-dom";
import CommentService from "../../services/comment-service";
import UserService from "../../services/user-service";
import {makeStyles} from "@material-ui/core";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel
  from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import {Link} from "react-router-dom";
import { useLocation } from 'react-router';
import Button from "@material-ui/core/Button";



const OthersProfilePage = ({

}) =>  {
  const pageStyles = userPageStyles();
  const history = useHistory();
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  // States
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [loggedInUser, setloggedInUser] = useState({})

  useEffect(() => {
    UserService.getOtherUser(userId)
    .then(user => {
      setCurrentUser(user);
      console.log("CurrentUser:", user);
      setUpdateSuccess(true)
    });

    UserService.getCurrentUser()
    .then(user => {
      setloggedInUser(user)
      console.log("Loggedin User: ", loggedInUser)
      if(user.username === userId){
        history.push("/profile")
      }
      return user
    })
  }, []);

  // Set user profile image based on signup info
  let imageUrl = 'url(https://i.pinimg.com/originals/7a/f8/28/7af8280fc6c75bc2191f4eed895a461d.jpg)'
  if (currentUser.image){
    imageUrl ='url(' + currentUser.image + ')'
  }
  // console.log(imageUrl)
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

  function AdminLabelText(){
    if (currentUser.isAdmin){
      return "User Is Admin"
    }
    else{
      return "User Is Not Admin"
    }
  }

  function StatsButton(props) {
    return (
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={pageStyles.submit}
            onClick={() => history.push(currentUser.username+"/stats")}
        >
          Summary Stats
        </Button>
    );
  }

  function LoginPromptText(props) {
    return (
        <Grid>
        <Link to="/login">
          Log in to see user's Summary Stats
        </Link>
        </Grid>
    );
  }
  let button;
  if (loggedInUser.username) {
    button = <StatsButton/>;
  } else {
    button = <LoginPromptText/>;
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
                        value={currentUser.username}
                        defaultValue={123}
                        // disabled
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        value={currentUser.favGenre}
                        defaultValue={123}
                        fullWidth
                        id="favGenre-show"
                        label="Favorite Genre"
                        name="Favorite Genre"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        value={currentUser.favMovie}
                        defaultValue={123}
                        fullWidth
                        name="Favorite Movie"
                        label="Favorite Movie"
                        type="Favorite Movie"
                        id="favMovie-show"
                    />
                  </Grid>
                <Grid item xs={12}>
                  <label>
                    <Radio
                        disabled
                        checked={currentUser.gender === 'female'}
                        value="female"
                        name="radio-button-gender"
                    />
                    Female
                  </label>
                  <label>
                    <Radio
                        disabled
                        checked={currentUser.gender === 'male'}
                        value="male"
                        name="radio-button-gender"
                        lable="male"
                    />
                    Male
                  </label>
                  <label>
                    <Radio
                        disabled
                        checked={currentUser.gender === 'other'}
                        value="other"
                        name="radio-button-gender"
                        lable="other"
                    />
                    Other
                  </label>
                </Grid>
                <Grid>
                  <FormControl component="fieldset">
                      <FormControlLabel
                          control={<Switch disabled checked={currentUser.isAdmin || false} name="isAdmin" />}
                          label={AdminLabelText()}
                      />
                  </FormControl>
                </Grid>
                </Grid>
              </form>
              {button}
            </div>
            <Box mt={5}>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={imgStyle.user_image} />
      </Grid>
  );
};
export default withRouter(OthersProfilePage);