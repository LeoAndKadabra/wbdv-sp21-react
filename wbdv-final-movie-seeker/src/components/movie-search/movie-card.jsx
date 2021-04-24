import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";

// this is re-rendered whenever the relevant parts of the used data stores change
const MovieCard = ({
  Title,
  Plot,
  Year,
  Poster,
  imdbID
  // food_pairing: foodPairing,
}) => {
  const movie = store({ details: false });

  return (
      <Card
          onClick={() => {
            movie.details = !movie.details;
          }}
          className="movie"
      >
        {!movie.details && (
            <CardMedia image={Poster} className="media" />
        )}
        <CardContent>
          <h4>{Title}</h4>
          {movie.details ? (
              <Link to={"/details/" + imdbID}>
                <p>Visit detail page</p>
              </Link>
          ) : (
              <div>
                Released: {Year}
              </div>
          )}
        </CardContent>
      </Card>
  );
};

export default view(MovieCard);
