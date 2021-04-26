import React from 'react'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import {Avatar, Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";


const MovieComment =
    ({
        currentUser,
        comment,
        deleteComment,
        turnOnMovieLink=false
    }) => {
    return(
        <Grid container wrap="nowrap" spacing={1}>
            <Grid item>
            <Avatar alt="Remy Sharp" src={"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                        <Link to={`/profile/${comment.username}`}>{comment.username + "              "}</Link>
                        <Rating
                            readOnly
                            name="simple-controlled"
                            value={comment.rating}
                        />
                </h4>
                <p style={{ textAlign: "left" }}>
                    {comment.content}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    posted at {comment.createdTime}
                </p>
            </Grid>
            <Grid item>
                {/*<Button
                    variant="contained"
                    color="teal"
                    className="float-right">
                    Update
                </Button>*/}
                {(currentUser.username === comment.username || currentUser.isAdmin === "true") && <Button
                    variant="contained"
                    color="secondary"
                    className="float-right"
                    onClick={() => deleteComment(comment)}>
                    Delete
                </Button>}
            </Grid>
            {
                turnOnMovieLink &&
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        className="float-right"
                        href={`/details/${comment.movieId}`}>
                        To Movie
                    </Button>
                </Grid>
            }
        </Grid>
    )
}

export default MovieComment