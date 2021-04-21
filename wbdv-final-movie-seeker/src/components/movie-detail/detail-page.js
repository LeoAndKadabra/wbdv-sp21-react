import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import MovieDetail from "./movie-detail";
import movieService from '../../services/movie-service'
import MovieCommentList from "./movie-comment-list";

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
            <MovieCommentList movieId={imdbID}/>
        </>
    )
}

export default DetailPage