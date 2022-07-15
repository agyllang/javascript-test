"use strict";
import { useState, useEffect, FC, ReactElement } from "react";
import { Video } from "./model";

interface MovieProps {
  updateRating?: (id: number, changes: Video) => void;
  movieResults?: Array<Video>;
  searchTerm?: string;
}

const MovieResults: React.FC<MovieProps> = (props): React.ReactElement => {
  const [edit, setEdit] = useState<boolean>(false);
  const [grade, setGrade] = useState<number>(1);
  const [video, setVideo] = useState<Video>();

  const handleConfirm = () => {
    props.updateRating(video.id, video);

    setEdit(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(parseInt(event.target.value));
    setVideo({ ...video, grade: parseInt(event.target.value) });
  };

  useEffect(() => {
    //the grade is set as state when a movie has been searched for
    //used to
    if (props.movieResults.length > 0) {
      setGrade(props.movieResults[0].grade);
      setVideo(props.movieResults[0]);
    }
  }, [props.movieResults]);

  return (
    <div>
      {props.movieResults.length === 0 && props.searchTerm !== null && (
        <span>Your search for "{props.searchTerm}" yielded no results</span>
      )}
      {props.movieResults.map((movie) => {
        return (
          <div key={movie.id}>
            <h4> {movie.title}</h4>
            {!edit ? (
              <>
                <span>Grade: {movie.grade}/5 </span>
                <button className="btn edit" onClick={() => setEdit(!edit)}>
                  Edit
                </button>
              </>
            ) : (
              <>
                <span>Edit grade</span>
                <input
                  className="input"
                  type="number"
                  onChange={handleOnChange}
                  min={1}
                  max={5}
                  value={grade}
                ></input>
                <button className="btn confirm" onClick={() => handleConfirm()}>
                  Confirm
                </button>
                <button className="btn cancel" onClick={() => setEdit(!edit)}>
                  Cancel
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { MovieResults };
