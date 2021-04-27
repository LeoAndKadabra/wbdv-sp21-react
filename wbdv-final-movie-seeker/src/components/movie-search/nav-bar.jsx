import React from 'react';
import { view } from '@risingstack/react-easy-state';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';
import appStore from './app-store';
import RollDice from "./roll-dice";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

// this is re-rendered whenever the relevant parts of the used data stores change
const NavBar = ({movieToSearch, setMovieToSearch}) => {
    const history = useHistory()

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
        <Grid item xs={11}>
            <Input
                onChange={(e) =>
                    setMovieToSearch(e.target.value)}
                value={movieToSearch}
                placeholder="Movie to search"
                style={{ width: "100%" }}
                inputProps={{ 'aria-label': 'description' }} />
        </Grid>
        <Grid item xs={1}>
            <Button
                onClick={() => history.push(`search/${movieToSearch}`)}>
                <SearchIcon className="float-right"/>
            </Button>
        </Grid>
    </Grid>
)};

export default view(NavBar);