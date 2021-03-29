// Store comments on the server
import Comment from '../models/comment'

const COMMENTS_STORAGE_KEY = "COMMENTS";


// TODO: use Database in next iterations
export const getAllComments = () =>{
  const itemJson = localStorage.getItem(COMMENTS_STORAGE_KEY);
  if(itemJson){
    return JSON.parse(itemJson);
  }
  else return []
};

export const createComment = (comment) => {
  const commentList = getAllComments();
  commentList.push(comment)
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(commentList))
};

export const getAllCommentsForMovie = (username) =>{
  const commentList = getAllComments();
  return commentList.filter( (c) => c.user === username)
};

// TODO: use Database in next iterations
export const getAllCommentsForUser = (movieName) =>{
  const commentList = getAllComments();
  return commentList.filter( (c) => c.movie === movieName)
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

