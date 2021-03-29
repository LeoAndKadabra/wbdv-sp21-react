import Rating from '../models/Rating'

const Ratings_STORAGE_KEY = "Ratings";


// TODO: use Database in next iterations
export const getAllRatings = () =>{
  const itemJson = localStorage.getItem(Ratings_STORAGE_KEY);
  if(itemJson){
    return JSON.parse(itemJson);
  }
  else return []
};

export const createRating = (Rating) => {
  const RatingList = getAllRatings();
  RatingList.push(Rating);
  localStorage.setItem(Ratings_STORAGE_KEY, JSON.stringify(RatingList))
};

export const getAllRatingsForMovie = (username) =>{
  const RatingList = getAllRatings();
  return RatingList.filter( (c) => c.user === username)
};

// TODO: use Database in next iterations
export const getAllRatingsForUser = (movieName) =>{
  const RatingList = getAllRatings();
  return RatingList.filter( (c) => c.movie === movieName)
};


export const deleteRating = (RatingId) => {
  const RatingList = getAllRatings();
  const updatedRatingList = RatingList.filter(Rating => Rating.id !== RatingId)
  localStorage.setItem(Ratings_STORAGE_KEY, JSON.stringify(updatedRatingList))
};

export const updateRating= (RatingId, Rating) => {
  deleteRating(RatingId);
  createRating(Rating)
};


export default {
  createRating,
  getAllRatings,
  getAllRatingsForMovie,
  getAllRatingsForUser,
  deleteRating,
  updateRating
}