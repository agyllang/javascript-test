import { MovieSearchBar } from "./MovieSearchBar";
import { MovieResults } from "./MovieResults";
import { useState,useEffect } from "react";
import { Video } from "./model";
// import axios from 'axios'

// console.log("axios",axios)

const App: React.FC<{}> = (): JSX.Element => {
  const [dataResults, setDataResults] = useState<Video[]>([]);
  console.log("dataResults");
  // const getMovie = async (query:string): Promise<any> => {
  //   // try {
  //   const url = `http://localhost:3000/videos?title=${query}`;
  //   const response = await axios.get(url);
  //   console.log("response",response)
  //   return response.data
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   return [];
  //   // }
  // }
  // }

  
  const getMovie = async (query: string) => {
    const response = await fetch(`http://localhost:3000/videos?title=${query}`);
    console.log("response", response);

    const data = await response.json();
    console.log("data", data);
    setDataResults(data);
  };
  // const updateVideo = async (id, changes): Promise<Video> => {

  // };

  // const updateVideo = async (id:number,grade:number) : Promise<Video> => {
  //   const response = await fetch(`http://localhost:3000/videos?title=${number}`)
  //   console.log("response",response)

  //   const data = await response.json()
  //   console.log("data",data)
  //   setDataResults(data)
  // }
  const updateMovie = async (id: number, changes: Video): Promise<Video> => {
    // Default options are marked with *
    const response = await fetch(`http://localhost:3000/videos/${id}`, {
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
    return response.json(); // parses JSON response into native JavaScript objects
  };
  // const getVideos = async (query: string): Promise<Video> => {
  //   console.log("get Videos with query", query)
  //   return await fetch(`http://localhost:3000/videos?title=${query}`).then(
  //      response => response.json()).then(res=> {
  //       console.log("data",res)

  //       // if (!res.ok) throw new Error(res.statusText);
  //       //  console.log("response.json()",response.json())
  //       // if(response.statusText==="200"){
  //       //     setDataResults(await response.json())
  //       // }
  //       // console.log(data)

  //       // console.log("response",)
  //       return res;
  //     }
  //   ).catch(error=>console.log("error:",error));
  // };

  return (
    <div>
      <MovieSearchBar searchFn={(query) => getMovie(query)} />
      <MovieResults
        updateRating={(id, changes) => updateMovie(id, changes)}
        movieResults={dataResults}
      />
    </div>
  );
};

export { App };
