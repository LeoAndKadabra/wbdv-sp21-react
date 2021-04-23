import React from 'react'
import Comment from '../../models/comment'
import Rating from '@material-ui/lab/Rating';
import {Avatar, Button, Grid} from "@material-ui/core";
import {teal, blue} from '@material-ui/core/colors'


const MovieComment = ({comment}) => {
    return(
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
            <Avatar alt="Remy Sharp" src={"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{comment.username}</h4>
                <p style={{ textAlign: "left" }}>
                    {comment.content}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    posted at {comment.createdTime}
                </p>
            </Grid>
            <Grid>
                <Button variant="contained" color="teal" className="float-right">
                    Update
                </Button>
                <Button variant="contained" color="secondary" className="float-right">
                    Delete
                </Button>
            </Grid>
        </Grid>
    )
}

export default MovieComment