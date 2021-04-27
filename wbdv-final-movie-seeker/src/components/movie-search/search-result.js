import React, {useEffect, useState} from 'react';
import {Link, useParams,useHistory} from "react-router-dom";
import NavBar from './nav-bar';
import MovieList from './movie-list';
import './movie-search.css'
import TopBar from "../top-bar";
import RollDice from "./roll-dice";
import UserService from "../../services/user-service";
import MovieService from '../../services/movie-service'
import Grid from "@material-ui/core/Grid";

// if a component does not use any store, it doesn't have to be wrapped with view()
// it is safer to wrap everything with view() until you get more comfortable with Easy State
export const SearchResultPage = () => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState({username: ""})
    const [moviesToDisplay, setMoviesToDisplay] = useState([])

    const {title} = useParams()
    console.log(title)

    const findMoviesByTitle = (title) => {
        MovieService.findMoviesByTitle(title)
            .then((results) => {
                setMoviesToDisplay(results.Search)
            })
    }

    useEffect(() => {
        UserService.getCurrentUser()
            .then(user => setCurrentUser(user))

        if (title && title !== "") {
            findMoviesByTitle(title)
        }
    }, [title])

    return (
        <>
            <TopBar currentUser={currentUser} headingText="Here the Seeking begins" />
            {
                moviesToDisplay.length > 0 &&
                <>
                    <Grid item>
                        <RollDice
                            list={moviesToDisplay}
                            className="float-right"/>
                    </Grid>
                    <MovieList moviesToDisplay={moviesToDisplay}/>
                </>
            }
        </>
    )};
