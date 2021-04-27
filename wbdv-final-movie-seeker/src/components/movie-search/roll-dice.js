import React, {useState, useEffect} from 'react'
import appStore from './app-store';
import {Link, useParams, useHistory} from 'react-router-dom'
import Button from "@material-ui/core/Button";

const RollDice = ({list}) => {

  const history = useHistory()

  const rollDice = (list) => {
      const randomIndex = Math.floor((Math.random() * list.length))
      const randomMovie = list[randomIndex];
      if (randomMovie === undefined) {
          alert("Please choose search a movie first!")
      } else {
          history.push(`/details/${randomMovie.imdbID}`)
      }
  }

  return (
      <div>
        <Button
            onClick={() => rollDice(list)}
            className="btn btn-primary">
          <i className="fas fa-dice fa-2x"></i>
        </Button>
      </div>
  )
}

export default RollDice