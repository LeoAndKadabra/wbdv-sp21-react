import React, {useEffect, useState} from 'react';
import {Link, useParams,useHistory} from "react-router-dom";
import NavBar from './nav-bar';
import MovieList from './movie-list';
import './movie-search.css'
import TopBar from "../top-bar";
import RollDice from "./roll-dice";
import UserService from "../../services/user-service";
import MovieService from '../../services/movie-service'

// if a component does not use any store, it doesn't have to be wrapped with view()
// it is safer to wrap everything with view() until you get more comfortable with Easy State
export const SearchPage = () => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState({username: ""})
    const [movieToSearch, setMovieToSearch] = useState("")

    useEffect(() => {
        UserService.getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    return (
        <>
            <TopBar currentUser={currentUser} headingText="Here the Seeking begins" />
            <NavBar movieToSearch={movieToSearch} setMovieToSearch={setMovieToSearch}/>
        </>
)};
