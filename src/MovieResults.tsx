"use strict";
import { useState, FC, ReactElement } from "react";
import {Video} from "./model"

interface MovieProps {
  updateRating?:  ((id: number) => void),
  movieResults?: Array<Video>
}

const MovieResults: React.FC<MovieProps> = (props): React.ReactElement => {
  const [movieId, setMovieId] = useState<number>();

  return (
    <ul>
        {props.movieResults.map(movie=> {
            return <li>{movie.title} </li>

        })}
     
    </ul>
  );
};

export { MovieResults };
