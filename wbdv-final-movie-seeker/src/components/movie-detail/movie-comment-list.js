import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Comment from "./movie-comment";
import CommentService, {updateComment} from "../../services/comment-service"
import SimpleRating from "../../components/movie-detail/movie-rating"
import userService, {getCurrentUser} from "../../services/user-service";
import { Button, Paper } from "@material-ui/core";
import UserService from "../../services/user-service";

const MovieCommentList = (
    {
        movieId
    }) => {
    const [comments, setComments] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [cachedComment, setCachedComment] = useState("new comment")
    const [rating, setRating] = useState()

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

        UserService.getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    return(
        <>
            <div className="row p-3">
                <div className="col">
                    You are logged in as: {currentUser.username}
                </div>
            </div>

            <Paper style={{ padding: "40px 20px", marginTop: 10 }}>

                    {
                        comments.map((comment, idx) =>
                        <Comment
                            comment={comment}
                            currentUser={currentUser}
                            deleteComment={deleteComment}
                            key={idx}
                        />
                        )
                    }
            </Paper>
            <div className="row text-primary p-3">
                <textarea
                    onChange={(e) =>
                        setCachedComment(e.target.value)}
                    placeholder="Enter one list item per line."
                    value={cachedComment}
                    rows={5}
                    className="form-control col-9"></textarea>
                <div className="col-3">
                    <div className="align-content-center">
                        <SimpleRating setRating={setRating}/>
                    </div>
                    <div className="align-content-center">
                        <Button
                            onClick={() => createComment()}
                            variant="contained" color="primary" className="float-right">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>)
}

export default MovieCommentList