"use strict";
import { useState, useEffect, FC, ReactElement } from "react";
import { Video } from "./model";

interface MovieProps {
  updateRating?: (id: number, changes: Video) => void;
  movieResults?: Array<Video>;
}

const MovieResults: React.FC<MovieProps> = (props): React.ReactElement => {
  //   const [movieId, setMovieId] = useState<number>();
  const [edit, setEdit] = useState<boolean>(false);
  const [grade, setGrade] = useState<number>(1);
  const [video, setVideo] = useState<Video>();
  console.log("video", video);

  const handleConfirm = () => {
    console.log("handleConfirm");

    props.updateRating(video.id, video);

    setEdit(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(parseInt(event.target.value));
    setVideo({ ...video, grade: parseInt(event.target.value) });
  };

  useEffect(() => {
    //the grade is set as state when a movie has been searched
    //used to
    if (props.movieResults.length > 0) {
      setGrade(props.movieResults[0].grade);
      setVideo(props.movieResults[0]);
    }
  }, [props.movieResults]);

  console.log("grade", grade);
  return (
    <ul>
      {props.movieResults.map((movie) => {
        return (
          <div key={movie.id}>
            <li>
              <li> {movie.title}</li>
              <li> {movie.grade} </li>
            </li>

            <button onClick={() => setEdit(!edit)}>Edit grade</button>
            {edit && <button onClick={() => handleConfirm()}>Confirm</button>}
            {edit && (
              <>
                Edit grade
                <input
                  type="range"
                  onChange={handleChange}
                  min={1}
                  max={5}
                  value={grade}
                ></input>
              </>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export { MovieResults };
