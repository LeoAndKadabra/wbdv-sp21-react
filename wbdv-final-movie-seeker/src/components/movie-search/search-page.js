import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import movieService from "../../services/movie-service"

const SearchPage = () => {
  const history = useHistory()
  const {title} = useParams()
  const [searchTitle, setSearchTitle] = useState(title)
  const [results, setResults] = useState({Search: []})

  useEffect(() => {
<<<<<<< HEAD
    setSearchTitle(title)
    findMovieByTitle(title)
  }, [])
=======
    if (title) {
      setSearchTitle(title)
      findMovieByTitle(title)
    }
  }, [title])
>>>>>>> d2e47a52fcaa1990e056ace0cb65cf5e97c6a365

  const findMovieByTitle = (title) => {
    history.push(title)
    movieService.findMoviesByTitle(title)
    .then((results) => {
      setResults(results)
    })
  }

<<<<<<< HEAD
=======
  const rollDice = (list) => {
    history.push(`/details/${list[Math.floor((Math.random()*list.length))].imdbID}`)
  }

>>>>>>> d2e47a52fcaa1990e056ace0cb65cf5e97c6a365
  return (
    <div>
      <h2>Search Page</h2>
      <input value={searchTitle}
             onChange={(event) => {
<<<<<<< HEAD
               setSearchTitle(event.target.value)
             }}
             className="form-control"/>
      <button
          onClick={() => {
=======
                 setSearchTitle(event.target.value)
               }}
             className="form-control"/>
      <button
          onClick={() => {
            history.push(`/search/${searchTitle}`)
>>>>>>> d2e47a52fcaa1990e056ace0cb65cf5e97c6a365
            findMovieByTitle(searchTitle)
          }}
          className="btn btn-primary">
        Search
      </button>
<<<<<<< HEAD
=======

>>>>>>> d2e47a52fcaa1990e056ace0cb65cf5e97c6a365
      <ul className="list-group">
        {
          results && results.Search && results.Search.map((movie) => {
            return (
<<<<<<< HEAD
              <li className="list-group-item">
                <Link to={'$movie.imdbID'}>
                  {movie.title}
=======
              <li key={movie.imdbID} className="list-group-item">
                <Link to={`/details/${movie.imdbID}`}>
                  {movie.Title}
>>>>>>> d2e47a52fcaa1990e056ace0cb65cf5e97c6a365
                </Link>
              </li>
            )
          })
        }
<<<<<<< HEAD
      </ul>
      </div>
=======
        <div>
          <button
              onClick={() => rollDice(results.Search)}
              className="btn btn-primary">
            Roll a dice?
          </button>
        </div>
      </ul>
    </div>
>>>>>>> d2e47a52fcaa1990e056ace0cb65cf5e97c6a365
  )
}

export default SearchPage