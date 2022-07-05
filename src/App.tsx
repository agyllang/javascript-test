import { MovieSearchBar } from "./MovieSearchBar";
import { MovieResults } from "./MovieResults";
import { useState } from "react";
import {Video} from "./model"



const App: React.FC<{}> = (): JSX.Element => {
  const [dataResults, setDataResults] = useState<Video[]>([]);
  console.log("dataResults")

  const getVideos = async (query: string): Promise<Video> => {
    console.log("get Videos with query", query)
    return await fetch(`http://localhost:3000/videos?title=${query}`).then(
       response => response.json()).then(res=> {
        console.log("data",res)

        // if (!res.ok) throw new Error(res.statusText);
        //  console.log("response.json()",response.json())
        // if(response.statusText==="200"){
        //     setDataResults(await response.json())
        // }
        // console.log(data)

        // console.log("response",)
        return res;
      }
    ).catch(error=>console.log("error:",error));
  };

  return (
    <div>
      <MovieSearchBar searchFn={(query) => getVideos(query)} />
      <MovieResults updateRating={() => {}} movieResults={dataResults}/>
    </div>
  );
};

export { App };
