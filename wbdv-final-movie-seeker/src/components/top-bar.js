import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

const TopBar = ({headingText, currentUser}) => {
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

    return (
        <Box pb={3}>
    <AppBar position="static">
        <Toolbar>
            <Link to="/" className="pr-2">
                <i className="fas fa-2x fa-home text-white"></i>
            </Link>
            <Typography variant="h6" style={{ flex: 1 }} className={useStyles.title}>
                {headingText}
            </Typography>
            <Link
                to="/search"
                style={{ fontSize: '19px' }}
                className="text-white p-2">
                <SearchIcon /> Search Movie
            </Link>
            {
                currentUser.username === "" && <Grid item>
                    <Link
                        to="/login"
                        style={{ fontSize: '19px' }}
                        className="text-white p-2">Login</Link>
                    <Link
                        to="/register"
                        style={{ fontSize: '19px' }}
                        className="text-white p-2">Register</Link>
                </Grid>
            }
            {
                currentUser.username &&
                <Typography variant="h6" color="inherit" className={useStyles.title}>
                    <Link to="/profile" className="text-white p-2">{currentUser.username}</Link>
                </Typography>
            }
        </Toolbar>
    </AppBar>
        </Box>
    )}

export default TopBar