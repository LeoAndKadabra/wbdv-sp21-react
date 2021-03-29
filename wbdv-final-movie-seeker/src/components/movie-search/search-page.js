import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import movieService from "../../services/movie-service"

const SearchPage = () => {
  const history = useHistory()
  const {title} = useParams()
  const [searchTitle, setSearchTitle] = useState(title)
  const [results, setResults] = useState({Search: []})

  useEffect(() => {
    setSearchTitle(title)
    findMovieByTitle(title)
  }, [])

  const findMovieByTitle = (title) => {
    history.push(title)
    movieService.findMoviesByTitle(title)
    .then((results) => {
      setResults(results)
    })
  }

  return (
    <div>
      <h2>Search Page</h2>
      <input value={searchTitle}
             onChange={(event) =>
                 setSearchTitle(event.target.value)}
             className="form-control"/>
      <button
          onClick={() => findMovieByTitle(searchTitle)}
          className="btn btn-primary">
        Search
      </button>
      <ul className="list-group">
        {
          results && results.Search && results.Search.map((movie) => {
            return (
              <li className="list-group-item">
                <Link to={'$movie.imdbID'}>
                  {movie.title}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SearchPage