import React, {useState, useEffect} from 'react'
import appStore from './app-store';
import {Link, useParams, useHistory} from 'react-router-dom'
import Button from "@material-ui/core/Button";

const RollDice = () => {

  const history = useHistory()

  const rollDice = () => {
    const list = appStore.movies
    const randomMovie = list[Math.floor((Math.random()*list.length))];
    if (randomMovie === undefined) {
      alert("Please choose search a movie first!")
    } else {
      history.push(`/details/${randomMovie.imdbID}`)
    }
  }

  return (
      <div>
        <Button
            onClick={() => rollDice()}
            className="btn btn-primary">
          <i className="fas fa-dice fa-2x"></i>
        </Button>
      </div>
  )
}

export default RollDice