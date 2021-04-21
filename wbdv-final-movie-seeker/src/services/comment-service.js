// Store comments on the server
import Comment from '../models/comment'

const COMMENTS_STORAGE_KEY = "COMMENTS";

export let commentList = [
  {
    content: "test1",
    movieId: "tt0103776"
  },
  {
    content: "test2",
    movieId: "tt0103776"
  }
]

// TODO: use Comment Service
export const getAllComments = () =>{
  return Promise.resolve(commentList)
};

export const createComment = (comments, comment) => {
  const commentList = comments;
  commentList.push(comment)
  return Promise.resolve(commentList)
};

export const getAllCommentsForMovie = (movieId) =>{
  const commentList = getAllComments();
  return commentList
      //.then(comments => comments.filter( (c) => c.movieId === movieId))
};

// TODO: use Database in next iterations
export const getAllCommentsForUser = (username) =>{
  const commentList = getAllComments();
  return commentList.filter( (c) => c.user === username)
};


export const deleteComment = (commentId) => {
  const commentList = getAllComments();
  const updatedCommentList = commentList.filter(comment => comment.id !== commentId)
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(updatedCommentList))
};

export const updateComment= (commentId, comment) => {
  deleteComment(commentId);
  createComment(comment)
};

export default {
  createComment,
  getAllComments,
  getAllCommentsForMovie,
  getAllCommentsForUser,
  deleteComment,
  updateComment
}

