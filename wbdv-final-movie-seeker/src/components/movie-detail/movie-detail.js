import React from 'react'

const MovieDetail = ({movie, history}) => {
    console.log(JSON.stringify(movie))
    return(
        <>
            <div class="row p-2">
                <div className="col">
                    <h2 className="m-2">
                        <i
                            className="fas fa-times text-dark"
                            onClick={()=>{history.goBack()}}>
                        </i>
                        <span className="ml-2">
                            {movie.Title}
                        </span>
                        <span className="text-muted m-1">({movie.Year})</span>
                    </h2>
                </div>
            </div>
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
                <p className="text-success h5">
                    {movie.Title} Brief Introduction ------
                </p>
                <hr/>
                <p>
                    {movie.Plot}
                </p>
            </div>
        </>
    )
}

export default MovieDetail