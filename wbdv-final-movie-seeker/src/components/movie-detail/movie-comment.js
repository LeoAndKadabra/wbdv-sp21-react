import React from 'react'
import Comment from '../../models/comment'
import Rating from '@material-ui/lab/Rating';
import {Avatar, Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";


const MovieComment =
    ({
        currentUser,
        comment,
        deleteComment
    }) => {
    return(
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
            <Avatar alt="Remy Sharp" src={"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                    {   currentUser.username !== "" &&
                            <Link to={`/profile/${comment.username}`}>{comment.username}</Link>
                    }
                    {   currentUser.username === "" &&
                            <p>{comment.username}</p>
                    }
                </h4>
                <p style={{ textAlign: "left" }}>
                    {comment.content}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    posted at {comment.createdTime}
                </p>
            </Grid>
            <Grid>
                {/*<Button
                    variant="contained"
                    color="teal"
                    className="float-right">
                    Update
                </Button>*/}
                {currentUser.username === comment.username && <Button
                    variant="contained"
                    color="secondary"
                    className="float-right"
                    onClick={() => deleteComment(comment)}>
                    Delete
                </Button>}
            </Grid>
        </Grid>
    )
}

export default MovieComment