import React from 'react';
import { view } from '@risingstack/react-easy-state';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';
import appStore from './app-store';
import RollDice from "./roll-dice";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

// this is re-rendered whenever the relevant parts of the used data stores change
const NavBar = () => (
    <div className="searchbar">
      <SearchBar
          onRequestSearch={appStore.findMoviesByTitle}
          placeholder="Search a movie ..."
          autoFocus
      />
      {appStore.isLoading && <LinearProgress />}
      <Link href="/">
        <Button  color="secondary"
            className="btn btn-primary">
          <i className="fas fa-home fa-2x"></i>
        </Button>
      </Link>
      <RollDice/>
    </div>
);

export default view(NavBar);