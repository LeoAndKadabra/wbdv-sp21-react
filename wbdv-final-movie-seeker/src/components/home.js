import React from 'react'
import {Link} from "react-router-dom";
import UserReducer from '../reducers/user-reducer'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

const reducer = combineReducers({
    userReducer: UserReducer
})

// const store = createStore(moduleReducer)
// const store = createStore(lessonReducer)
const store = createStore(reducer)

const Home = () => {
    return(
        <div>
            <h2>Movie Seeker</h2>
            <Link to="/search">
                Search
            </Link>
            <br/>
            <Link to="/details">
                Details
            </Link>
            <Link to="/register">
                Register
            </Link>
            <Link to="/login">
                Login
            </Link>
        </div>
    )
}

export default Home