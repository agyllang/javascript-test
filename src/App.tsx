import { MovieSearchBar } from "./MovieSearchBar";
import { MovieResults } from "./MovieResults";
import { useState, useEffect, useRef } from "react";
import { Video } from "./model";

const App: React.FC<{}> = (): JSX.Element => {
  const [dataResults, setDataResults] = useState<Video[]>([]);
  const [updateId, setUpdateID] = useState<number>(null);
  const [searchTerm, setSearch] = useState<string>(null);
  const [changeMovie, setChangeMovie] = useState<Video>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    //this useEffect function triggers once a movie grade has been changed

    // abortController is used to handle race conditions

    const abortController: AbortController = new AbortController();
    if (updateId == null) {
      return;
    }
    console.log("useEffect PUT request");

    const updateMovie = async (id: number, changes: Video): Promise<void> => {
      // setLoading(true);
      // Default options are marked with *
      try {
        const response = await fetch(`http://localhost:3000/videos/${id}`, {
          signal: abortController.signal,
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(changes), // body data type must match "Content-Type" header
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          console.log("response", response);
          const result = await response.json();
          console.log("updateMovie result:", result);

          //updates the view with the updated movie
          setDataResults([result]);
          // return result; // parses JSON response into native JavaScript objects}
        }
      } catch (err) {
        console.log("Error caught:", err);
      }
    };
    updateMovie(updateId, changeMovie);

    return () => {
      abortController.abort();
    };
  }, [updateId, changeMovie]);

  const throttling = useRef(false);

  const handleThrottleSearch = (query: string, timeout: number) => {
    setSearch(query);

    if (throttling.current) {
      console.log("Throttle:", throttling.current);
      return;
    }

    throttling.current = true;
    setLoading(true);
    setTimeout(() => {
      throttling.current = false;
      fetch(`http://localhost:3000/videos?title=${query}`)
        .then(async (response) => {
          if (!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            const data = await response.json();
            console.log("data from fetch:", data);
            setLoading(false);
            setDataResults(data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, timeout);
  };

  const updateRating = (id: number, changes: Video) => {
    //callback function passed down as a prop to a movie component,
    //used for setting the ID of movie to update, and with what changes.

    setUpdateID(id);
    setChangeMovie(changes);
  };

  return (
    <div>
      <MovieSearchBar searchFn={(query) => handleThrottleSearch(query, 800)} />
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <MovieResults
            updateRating={(id, changes) => updateRating(id, changes)}
            movieResults={dataResults}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};

export { App };
