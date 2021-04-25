import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CommentService, {getLatestSeveralComments} from "../services/comment-service";
import UserService from "../services/user-service";
import CommentList from "./general-comment/comment-list";

const Home = () => {
    const [currentUser, setCurrentUser] = useState({
        username: ""
    })

    const [comments, setComments] = useState([])

    useEffect(() => {
        UserService.getCurrentUser()
            .then(user => {
                setCurrentUser(user)
                return user
            })
            .then((user) => {
                if (user.username !== "")
                    CommentService.getLatest3CommentsForUser(user.username)
                        .then(comments => setComments(comments))
                else
                    CommentService.getLatestSeveralComments(5)
                        .then(comments => setComments(comments))
        })
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        }
    }));

    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flex: 1 }} className={useStyles.title}>
                            Welcome to Movie Seeker
                        </Typography>
                        <IconButton
                            href="/search"
                            style={{ fontSize: '19px' }}
                            className={useStyles.menuButton}
                            color="inherit">
                            <SearchIcon /> Search Movie
                        </IconButton>
                        {
                            currentUser.username === "" && <Grid item>
                                <Button
                                    href="/login"
                                    color="inherit"
                                    style={{fontSize: '19px'}}>Login</Button>
                                <Button
                                href="/register"
                                color="inherit"
                                style={{fontSize: '19px'}}>Register</Button>
                            </Grid>
                        }
                        {
                            currentUser.username && <Typography variant="h6" style={{ flex: 1 }} className={useStyles.title}>
                                <Link to="/profile">{currentUser.username}</Link>
                            </Typography>
                        }
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item container xs={12} spacing={3} >
                <Grid item xs={4}>
                    <Link to={'/search/batman'}>
                        <Card>
                            <CardHeader
                                title="Batman Begins"
                                subheader="2005"
                            />
                            <CardMedia
                                className={useStyles.media}
                                component="img"
                                src="data:image/jpeg;base64,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"
                                title="Batman"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Are you interested in it?
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to={'/search/batman'}>
                        <Card>
                            <CardHeader
                                title="The Dark Knight"
                                subheader="2008"
                            />
                            <CardMedia
                                className={useStyles.media}
                                component="img"
                                src="https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg"
                                title="Batman"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Are you interested in it?
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to={'/search/batman'}>
                        <Card>
                            <CardHeader
                                title="The Dark Knight Rises"
                                subheader="2012"
                            />
                            <CardMedia
                                className={useStyles.media}
                                component="img"
                                href="/search/batman"
                                src="https://resizing.flixster.com/Ev6G8Z0H3SFepS-SDY0X-OsVpmQ=/206x305/v2/https://flxt.tmsimg.com/NowShowing/108806/108806_ac.jpg"
                                title="Batman"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Are you interested in it?
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={3}>
                <CommentList comments={comments}/>
            </Grid>
        </Grid>
    )
}

export default Home