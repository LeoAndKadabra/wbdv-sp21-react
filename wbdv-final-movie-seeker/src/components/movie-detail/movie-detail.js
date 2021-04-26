import React from 'react'
import TopBar from "../top-bar";
import Grid from "@material-ui/core/Grid";

const MovieDetail = ({movie, history, currentUser}) => {
    console.log(JSON.stringify(movie))
    const headingText= movie.Title
    return(
        <>
            <Grid item xs={12}>
                <TopBar headingText={headingText} currentUser={currentUser} />
            </Grid>
            <div className="row p-2">
                <div className="col-4">
                    <div className="row text-center">
                        <img src={movie.Poster} className="h-100 rounded"/>
                    </div>
                </div>
                <div className="col-8">
                    <p>
                        <span className="text-muted">Director:</span> {movie.Director}
                    </p>
                    <p>
                        <span className="text-muted">Writer:</span> {movie.Writer}
                    </p>
                    <p>
                        <span className="text-muted">Actors:</span> {movie.Actors}
                    </p>
                    <p>
                        <span className="text-muted">Genre:</span> {movie.Genre}
                    </p>
                    <p>
                        <span className="text-muted">Release:</span> {movie.Released}
                    </p>
                    <p>
                        <span className="text-muted">Runtime:</span> {movie.Runtime}
                    </p>
                    <p>
                        <span className="text-muted">Rated:</span> {movie.Rated}
                    </p>
                    <p>
                        <span className="text-muted">Awards:</span> {movie.Awards}
                    </p>
                </div>
            </div>
            <div className="row p-2">
                <div className="col">
                    <p className="text-success h5">
                        {movie.Title} Brief Introduction ------
                    </p>
                    <p>
                        {movie.Plot}
                    </p>
                </div>
            </div>
        </>
    )
}

export default MovieDetail