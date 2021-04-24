import React from 'react';
import { view } from '@risingstack/react-easy-state';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';
import appStore from './app-store';
import RollDice from "./roll-dice";

// this is re-rendered whenever the relevant parts of the used data stores change
const NavBar = () => (
    <div className="searchbar">
      <SearchBar
          onRequestSearch={appStore.findMoviesByTitle}
          placeholder="Search a movie ..."
          autoFocus
      />
      {appStore.isLoading && <LinearProgress />}
      <RollDice/>
    </div>
);

export default view(NavBar);