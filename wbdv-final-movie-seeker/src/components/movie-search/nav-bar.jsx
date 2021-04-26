import React from 'react';
import { view } from '@risingstack/react-easy-state';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';
import appStore from './app-store';
import RollDice from "./roll-dice";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

// this is re-rendered whenever the relevant parts of the used data stores change
const NavBar = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        }
    }));

    return (
    <Grid
        container
        spacing={1}
        className={useStyles.root}>
        <Grid item style={{ flex: 1 }}>
            <SearchBar
                onRequestSearch={appStore.findMoviesByTitle}
                placeholder="Search a movie ..."
            />
            {appStore.isLoading && <LinearProgress />}
        </Grid>
        <Grid item>
            <RollDice className="float-right"/>
        </Grid>
    </Grid>
)};

export default view(NavBar);