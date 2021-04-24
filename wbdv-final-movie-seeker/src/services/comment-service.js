// Store comments on the server
import Comment from '../models/comment'

const COMMENTS_STORAGE_KEY = "COMMENTS";

export let commentList = [
  // {
  //   content: "test1",
  //   movieId: "tt0103776"
  // },
  // {
  //   content: "test2",
  //   movieId: "tt0103776"
  // }
]

const COMMENT_URL = "http://localhost:8080/comments";

// TODO: Do we need this?
export const getLatest3Comments = () =>{

};

export const createComment = (comment) => {
  return fetch(`${COMMENT_URL}`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'content-type': 'application/json'
    },
    credentials: "include"
  })
  .then(
      response => response.json()
  )
};

export const getAllCommentsForMovie = (movieId) =>
  fetch(`${COMMENT_URL}?movieId=${movieId}`, {
    credentials: "include"
  })
  .then(response => response.json())

export const getLatest3CommentsForMovie = (movieId) =>
    fetch(`${COMMENT_URL}?movieId=${movieId}`, {
      credentials: "include"
    })
        .then(response => response.json()).then(comments => comments.slice(-3))

export const getAllCommentsForUser = (username) =>{
  return fetch(`${COMMENT_URL}?username=${username}`, {
    credentials: "include"
  })
  .then(response => response.json());
};

export const getLatest3CommentsForUser = (username) =>{
  return fetch(`${COMMENT_URL}?username=${username}`, {
    credentials: "include"
  })
      .then(response => response.json()).then(comments => comments.slice(-3))
};

export const deleteComment = (commentId) => {
  return fetch(`${COMMENT_URL}`, {
    method: 'DELETE',
    credentials: "include",
    body: JSON.stringify(
        {
          _id: commentId
        }
    ),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json());
};

export const updateComment= (commentId, NewComment) => {
  deleteComment(commentId);
  createComment(NewComment)
};

export default {
  createComment,
  //getAllComments,
  getLatest3CommentsForUser,
  getLatest3CommentsForMovie,
  getAllCommentsForMovie,
  getAllCommentsForUser,
  deleteComment,
  updateComment
}

