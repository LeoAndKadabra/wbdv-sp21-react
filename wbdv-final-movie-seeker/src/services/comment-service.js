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

//const COMMENT_URL = "https://movie-seeker.herokuapp.com/comments";
 const COMMENT_URL = "http://localhost:8080/comments";

export const getLatestSeveralComments = (limit) => {
  return fetch(`${COMMENT_URL}?limit=${limit}`)
  .then(response => response.json());
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
  return fetch(`${COMMENT_URL}?username=${username}&limit=3`, {
    credentials: "include"
  })
      .then(response => response.json())
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

export const updateComment= (commentId, NewComment) =>
  fetch(`${COMMENT_URL}`, {
    method: 'PUT',
    body: JSON.stringify(NewComment),
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export default {
  createComment,
  getLatestSeveralComments,
  getLatest3CommentsForUser,
  getLatest3CommentsForMovie,
  getAllCommentsForMovie,
  getAllCommentsForUser,
  deleteComment,
  updateComment
}

