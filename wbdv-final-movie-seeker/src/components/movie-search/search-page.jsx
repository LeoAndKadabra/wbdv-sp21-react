import React from 'react';
import NavBar from './nav-bar';
import MovieList from './movie-list';
import './movie-search.css'
import RollDice from "./roll-dice";

// if a component does not use any store, it doesn't have to be wrapped with view()
// it is safer to wrap everything with view() until you get more comfortable with Easy State
export const SearchPage = () => (
    <>
      <NavBar />
      <MovieList />
    </>
);
