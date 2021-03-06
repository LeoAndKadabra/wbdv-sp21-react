import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

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
          {movie.details ? (
              <>
                <img className="image" src="https://claretalksrubbish.com/wp-content/uploads/Untitled-design-1080x675.jpg"/>
                <div className="spacing">
                  <Link to={"/details/" + imdbID}>
                    <Button variant="outlined">
                      Visit detail page
                    </Button>
                  </Link>
                </div>
              </>
          ) : (
              <div>
                <h4>{Title}</h4>
                Released: {Year}
              </div>
          )}
        </CardContent>
      </Card>
  );
};

export default view(MovieCard);
