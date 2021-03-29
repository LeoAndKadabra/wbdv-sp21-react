<<<<<<< HEAD
import React from 'react'

const DetailPage = () => {
    return
    (
        <div>
            PlaceHolder
        </div>
=======
import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import MovieDetail from "./movie-detail";
import movieService from '../../services/movie-service'
import MovieComment from "./movie-comment";

const DetailPage = () => {
    const {imdbID} = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState({})
    useEffect(() => {
        findMovieByImdbID()
    }, [])
    const findMovieByImdbID = () => {
        movieService.findMovieByImdbID(imdbID)
            .then((data) => {
                setMovie(data)
            })
    }
    return(
        <>
            <MovieDetail movie={movie} history={history}/>
            {/*<MovieComment />*/}
        </>
>>>>>>> d2e47a52fcaa1990e056ace0cb65cf5e97c6a365
    )
}

export default DetailPage