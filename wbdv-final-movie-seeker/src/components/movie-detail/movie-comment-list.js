import React, {useEffect, useState} from 'react'
import Comment from "./movie-comment";
import CommentService, {updateComment} from "../../services/comment-service"
import SimpleRating from "../../components/movie-detail/movie-rating"
import { Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import UserService from "../../services/user-service";

const MovieCommentList = (
    {
        movieId,
        currentUser
    }) => {
    const [comments, setComments] = useState([])
    const [cachedComment, setCachedComment] = useState("new comment")
    const [rating, setRating] = useState(5)

    const createComment = () => {
        if (!currentUser || currentUser.username === "") {
            alert("Please login to create comment!")
            return
        }
        // Send create request to Service, then set comment list
        CommentService.createComment({
            username: currentUser.username,
            content: cachedComment,
            movieId: movieId,
            rating: rating
        })
            .then(newComment => {
                console.log(newComment)
                setComments([
                    ...comments,
                    newComment
                ])})
    }

    const likeComment = (commentToLike) => {
        // add comment to user/userlike
        const newCurrentUser = {
            ...currentUser,
            likedComments: currentUser.likedComments ? [commentToLike._id] : [
                ...currentUser.likedComments,
                commentToLike._id
            ]
        }
        UserService.updateUser(newCurrentUser)

        // add user to comment/likedUser
        const newComment = {
            ...commentToLike,
            likedUsers: commentToLike.likedUsers ? [currentUser.username]: [
                ...commentToLike.likedUsers,
                currentUser.username
            ]
        }
        CommentService.updateComment(commentToLike._id, newComment)
            .then(updatedComment => {
                const newComments = comments.map(comment => {
                    if(comment._id === updatedComment._id) {
                        return updatedComment
                    } else {
                        return comment
                    }
                })
                setComments(newComments)
            })
    }

    const deleteComment = (commentToDel) => {
        CommentService.deleteComment(commentToDel._id)
            .then(status => {
                console.log(status)
                setComments(comments.filter(curComment => curComment._id!== commentToDel._id))})
    }

    useEffect(() => {
        // get comments from server
        CommentService.getAllCommentsForMovie(movieId)
            .then(comments => {
                console.log(movieId)
                console.log(comments)
                setComments(comments)
            })
    }, [])

    return(
        <Grid container spacing={3}>
            {comments.length > 0 &&
            <Grid item xs={12}>
                <Paper style={{padding: "40px 20px", marginTop: 10}}>
                    {
                        comments.map((comment, idx) =>
                            <Comment
                                comment={comment}
                                currentUser={currentUser}
                                likeComment={likeComment}
                                deleteComment={deleteComment}
                                key={idx}
                            />
                        )
                    }
                </Paper>
            </Grid>
            }
            <Grid item container xs={12}>
                <Grid item xs={12}>
                <textarea
                    onChange={(e) =>
                        setCachedComment(e.target.value)}
                    placeholder="Please enter your comment."
                    className="form-control mp-2"></textarea>
                <Grid item container direction={"row"} xs={12} spacing={1}>
                    <Grid item xs={9}>
                        <SimpleRating
                            value={5}
                            style={{ marginTop: 10 }}
                            setRating={setRating}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            style={{marginTop: 10 }}
                            onClick={() => createComment()}
                            variant="contained" color="primary" className="float-right">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
        </Grid>)
}

export default MovieCommentList