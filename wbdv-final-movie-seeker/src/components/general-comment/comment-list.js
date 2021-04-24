import React, {useEffect, useState} from 'react'
import Comment from "../movie-detail/movie-comment";
import { Button, Paper } from "@material-ui/core";

const CommentList = (
    {
        comments
    }) => {

    return(
        <>
            <Paper style={{ padding: "40px 20px", marginTop: 10 }}>

                {
                    comments.map((comment, idx) =>
                        <Comment
                            comment={comment}
                            key={idx}
                            currentUser={{username: null}}
                        />
                    )
                }
            </Paper>
        </>)
}

export default CommentList