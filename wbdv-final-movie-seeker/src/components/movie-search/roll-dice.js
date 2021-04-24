import React, {useState, useEffect} from 'react'
import appStore from './app-store';
import {Link, useParams, useHistory} from 'react-router-dom'

const RollDice = () => {

  const history = useHistory()

  const rollDice = () => {
    const list = appStore.movies
    history.push(`/details/${list[Math.floor((Math.random()*list.length))].imdbID}`)
  }

  return (
      <div>
        <button
            onClick={() => rollDice()}
            className="btn btn-primary">
          <i className="fas fa-dice"></i>
        </button>
      </div>
  )
}

export default RollDice