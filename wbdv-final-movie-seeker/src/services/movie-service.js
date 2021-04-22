const apiKey = "8c978840"

const findMoviesByTitle = (title) => {
  return fetch(getSearchUrlByTitle(title))
  .then(response => response.json())
}

const findMovieByImdbID = (imdbID) => {
  return fetch(getSearchUrlByImdbId(imdbID))
  .then(response => response.json())
}

const getSearchUrlByTitle = (title) => `http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`
const getSearchUrlByImdbId = (id) => `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`

export default {
  findMoviesByTitle,
  findMovieByImdbID
}