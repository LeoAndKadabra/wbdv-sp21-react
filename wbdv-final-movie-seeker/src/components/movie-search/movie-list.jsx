import React from 'react';
import { view } from '@risingstack/react-easy-state';
import appStore from './app-store';
import MovieCard from './movie-card';

// this is re-rendered whenever the relevant parts of the used data stores change
const MovieList = () => (
    <div className="movielist">
      {appStore.movies === undefined || !appStore.movies.length ? (
          <div className="container-fluid">
              {/*<h3>No matching movies found!</h3>*/}
              <img src="https://www.genteditalia.org/wp-content/uploads/2019/05/Depositphotos_12283216_s-2019.jpg"/>
          </div>
      ) : (
          appStore.movies.map(movie => <MovieCard key={movie.Title} {...movie} />)
      )}
    </div>
);

export default view(MovieList);
