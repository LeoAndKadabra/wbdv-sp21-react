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
            <MovieComment comments = {[
                {user: "bb", content: "I like it", rating: 5},
                {user: "bb2", content: "I like it2", rating: 5}
                ]}/>
        </>
    )
}

export default DetailPage