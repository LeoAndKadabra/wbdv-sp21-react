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
export const getAllComments = () =>{
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
  fetch(`${COMMENT_URL}?movieId=${movieId}`)
  .then(response => response.json())

export const getAllCommentsForUser = (username) =>{
  return fetch(`${COMMENT_URL}?username=${username}`, {
    credentials: "include"
  })
  .then(response => response.json());
};

export const deleteComment = (commentId) => {
  return fetch(`${COMMENT_URL}`, {
    method: 'DELETE',
    credentials: "include",
    body: JSON.stringify(commentId),
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
  getAllComments,
  getAllCommentsForMovie,
  getAllCommentsForUser,
  deleteComment,
  updateComment
}

