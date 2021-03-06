import React, {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CommentService from "../../services/comment-service";
import UserService from "../../services/user-service";
import CommentList from "../general-comment/comment-list";
import TopBar from "../top-bar";
import {Link, useHistory} from "react-router-dom";
import { useLocation } from 'react-router';
import Button from "@material-ui/core/Button";

const summaryPageStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary,
  }
}));

const SummaryStats = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = summaryPageStyles();
  const userId = location.pathname.split('/')[2];

  const [currentUser, setCurrentUser] = useState({
    username: ""
  })
  const [displayUser, setDisplayUser] = useState({
    username: ""
  })
  const [comments, setComments] = useState([])
  const [selfUserComments, setSelfUserComments] = useState([])
  const [tabContent, setTabContent] = useState("all_comments")

  useEffect(() => {
    //get logged in user
    UserService.getCurrentUser()
    .then(user => {
      setCurrentUser(user)
      console.log("Loggedin User: ", user)
      return user
    })
    .then((user) => {
      if (!user.username) {
        // Alert then force quit
        window.alert("You must login to view someone's stats!");
        history.push("/login");
      }
      else {
        CommentService.getAllCommentsForUser(user.username)
        .then(comments => {
          setSelfUserComments(comments)
        });
      }
    })

    // get display user
    UserService.getOtherUser(userId)
    .then(user => {
      setDisplayUser(user);
      console.log("displayUser:", user);
    });

    // get comments for display user
    CommentService.getAllCommentsForUser(userId)
    .then(comments => {
      setComments(comments)
    });
  }, []);

  function getTabTitle(tabContent, userName){
    if(!userName){
      userName = 'User'
    }
    switch (tabContent) {
      case "all_comments":
        return "All Comments from " + userName + ":";

      default:
        return ""
    }
  }


  function getNumLikedComments(user) {
    if(user.likedComments){
      return user.likedComments.length
    }
    else{
      return 0
    }
  }

  function getNumDeletedComments(user) {
    if(user.numberDeleted){
      return user.numberDeleted
    }
    else{
      return 0
    }
  }

  function getComparisonResult(yourNum, targetNum, itemName, currentUser, displayUser) {
    if(currentUser.username === displayUser.username){
      return "You are viewing your own stats"
    }
    if(targetNum === 0){
      return "This user don't have any " + itemName + " yet"
    }
    if(yourNum === 0){
      return "You don't have any " + itemName + " yet"
    }
    if(yourNum > targetNum){
      return "This is "+ percDiff(yourNum, targetNum) + "% less than your " + itemName
    }else if(yourNum < targetNum){
      return "This is "+ percDiff(yourNum, targetNum) + "% more than your " + itemName
    } else {
      return "Wow, you two had equal amount of "+ itemName + "!"
    }
  }

  function percDiff (A, B){
    return  Math.round(100 * Math.abs( (A - B) / (A)));
  }

  function LikeStatCard(props) {
    return (
        <Card>
          <CardHeader
              title="Liked Comments:"
              subheader="Num comments this user liked"
          />
          <CardContent>
            <Typography variant="h3" color="blue" component="p">
              {getNumLikedComments(displayUser)}
            </Typography>
            <Typography variant="body" color="textSecondary" component="p">
            </Typography>
            <Typography variant="body" color="primary" component="p">
              {getComparisonResult(getNumLikedComments(currentUser), getNumLikedComments(displayUser), "likes", currentUser, displayUser)}
            </Typography>
          </CardContent>
        </Card>
    );
  }

  function DeleteStatCard(props) {
    return (
        <Card>
          <CardHeader
              title="Deleted Comments:"
              subheader="Num comments this admin deleted"
          />
          <CardContent>
            <Typography variant="h3" color="blue" component="p">
              {getNumDeletedComments(displayUser)}
            </Typography>
            <Typography variant="body" color="textSecondary" component="p">
            </Typography>
            <Typography variant="body" color="primary" component="p">
              {getComparisonResult(getNumDeletedComments(currentUser), getNumDeletedComments(displayUser), "deleted comments", currentUser, displayUser)}
            </Typography>
          </CardContent>
        </Card>
    );
  }
  let card;
  if (displayUser.isAdmin) {
    card = <DeleteStatCard/>;
  } else {
    card = <LikeStatCard/>;
  }


  return(
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopBar headingText= {displayUser.username + "'s Summary Statistics"} currentUser={currentUser} />
        </Grid>
        <Grid item container xs={12} spacing={5} >
          <Grid item xs={6}>
              <Card>
                <CardHeader
                    title="Total Comments:"
                    subheader="Num comments submitted"
                />
                <CardContent>
                  <Typography variant="h3" component="p">
                    {comments.length}
                  </Typography>
                  <Typography variant="body" color="primary" component="p">
                   {getComparisonResult(selfUserComments.length, comments.length, "comments", currentUser, displayUser)}
                  </Typography>
                </CardContent>
              </Card>
          </Grid>
          <Grid item xs={6}>
            {card}
          </Grid>
        </Grid>
        <Grid item xs = {12}>
        <Typography variant="h5" component="h1">
          {getTabTitle(tabContent, displayUser.username)}
        </Typography>
        </Grid>
        <Grid item xs={12} spacing={3}>
          <CommentList comments={comments} currentUser={currentUser}/>
        </Grid>
      </Grid>
  )
}

export default SummaryStats