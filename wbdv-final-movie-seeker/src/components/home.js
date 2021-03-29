import React from 'react'
import {Link} from "react-router-dom";

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
        </div>
    )
}

export default Home