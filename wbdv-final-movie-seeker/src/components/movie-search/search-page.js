import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import movieService from "../../services/movie-service"

const SearchPage = () => {
  const history = useHistory()
  const {title} = useParams()
  const [searchTitle, setSearchTitle] = useState(title)
  const [results, setResults] = useState({Search: []})

  useEffect(() => {
    if (title) {
      setSearchTitle(title)
      findMovieByTitle(title)
    }
  }, [title])

  const findMovieByTitle = (title) => {
    history.push(title)
    movieService.findMoviesByTitle(title)
    .then((results) => {
      setResults(results)
    })
  }

  const rollDice = (list) => {
    history.push(`/details/${list[Math.floor((Math.random()*list.length))].imdbID}`)
  }

  return (
    <div>
      <h2>Search Page</h2>
      <input value={searchTitle}
             onChange={(event) => {
                 setSearchTitle(event.target.value)
               }}
             className="form-control"/>
      <button
          onClick={() => {
            history.push(`/search/${searchTitle}`)
            findMovieByTitle(searchTitle)
          }}
          className="btn btn-primary">
        Search
      </button>

      <ul className="list-group">
        {
          results && results.Search && results.Search.map((movie) => {
            return (
              <li key={movie.imdbID} className="list-group-item">
                <Link to={`/details/${movie.imdbID}`}>
                  {movie.Title}
                </Link>
              </li>
            )
          })
        }
        <div>
          <button
              onClick={() => rollDice(results.Search)}
              className="btn btn-primary">
            Roll a dice?
          </button>
        </div>
      </ul>
    </div>
  )
}

export default SearchPage