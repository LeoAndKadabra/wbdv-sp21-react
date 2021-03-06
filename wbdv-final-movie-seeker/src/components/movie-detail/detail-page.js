import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import MovieDetail from "./movie-detail";
import movieService from '../../services/movie-service'
import MovieCommentList from "./movie-comment-list";
import UserService from "../../services/user-service";

const DetailPage = () => {
    const {imdbID} = useParams()
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState({username: ""})
    const [movie, setMovie] = useState({})
    useEffect(() => {
        UserService.getCurrentUser()
            .then(user => setCurrentUser(user))
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
            <MovieDetail movie={movie} history={history} currentUser={currentUser}/>
            <MovieCommentList movieId={imdbID} currentUser={currentUser}/>
        </>
    )
}

export default DetailPage