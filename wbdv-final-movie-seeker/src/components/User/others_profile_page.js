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
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel
  from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import {Link} from "react-router-dom";
import { useLocation } from 'react-router';
import queryString from 'query-string';


const OthersProfilePage = ({
  props,
  username,

}) =>  {
  const pageStyles = userPageStyles();
  const history = useHistory();
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  console.log(userId);

  // States
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    //console.log("param:", this.props.match.params.redirectParam)
    UserService.getOtherUser(userId)
    .then(user => {
      setCurrentUser(user);
      console.log("SessionUser:", user);
    });

    // get comments from server
    CommentService.getLatest3CommentsForUser(currentUser.username)
    .then(comments => {
      // console.log(comments)
      setComments(comments)
    });
  }, [])

  // Set user profile image based on signup info
  let imageUrl = 'url(https://cdn.hipwallpaper.com/i/37/23/nT8CqZ.jpeg)'
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

  //admin setter
  const [adminState, setAdminState] = React.useState({
    isAdmin: currentUser.isAdmin,
  });

  //gender setter
  const [genderState, setGender] = useState(currentUser.gender);
  const changeGender = (event) => {
    setGender(event.target.value)
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
                        fullWidth
                        id="favGenre-show"
                        label="Favorite Genre"
                        name="Favorite Genre"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        value={currentUser.favMovie}
                        fullWidth
                        name="Favorite Movie"
                        label="Favorite Movie"
                        type="Favorite Movie"
                        id="favMovie-show"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    <Radio
                        readOnly
                        checked={genderState === 'female'}
                        onChange={changeGender}
                        value="female"
                        name="radio-button-gender"
                    />
                    Female
                  </label>
                  <label>
                    <Radio
                        readOnly
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
                        readOnly
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
                          control={<Switch readOnly checked={adminState.isAdmin} name="isAdmin" />}
                          label="User is admin"
                      />
                    </FormGroup>
                  </FormControl>
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
};
export default withRouter(OthersProfilePage);