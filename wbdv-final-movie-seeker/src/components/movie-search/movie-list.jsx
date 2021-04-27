import React from 'react';
import { view } from '@risingstack/react-easy-state';
import appStore from './app-store';
import MovieCard from './movie-card';

// this is re-rendered whenever the relevant parts of the used data stores change
const MovieList = ({moviesToDisplay}) => (
    <div className="movielist">
        {moviesToDisplay.map(movie => <MovieCard key={movie.Title} {...movie} />)}
    </div>
);

export default view(MovieList);
