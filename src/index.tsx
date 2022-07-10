
// import { render } from "react-dom"
import { App } from "./App"
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
// render(
//   <>
//     <App />
//   </>,
//   document.querySelector<Element>("#app")
// )
// console.log("index.tsx")
// // GET http://localhost:3000/videos
// const getVideos = async(query:string):Promise<Video> => {
//   return await fetch(`http://localhost:3000/videos?title=${query}`)
//    .then(response => {
//      if (!response.ok) throw new Error(response.statusText);
//     //  console.log(response.json()) 
//      return response.json()
//    });
// }

// // PUT http://localhost:3000/videos/${id}
// const updateVideo = async (id, changes): Promise<Video> => {

// };
