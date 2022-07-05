"use strict";
import { useState, FC, ReactElement } from "react";
interface SearchProps {
  searchFn:  ((query: string) => void)
}

const MovieSearchBar: React.FC<SearchProps> = (props): React.ReactElement => {
  const [query, setQuery] = useState("");
  
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    // const searchQuery: string = target.value.toLowerCase();
    const searchQuery: string = target.value
    setQuery(searchQuery);
  };
  console.log("query:", query);


  return (
    <div>
      <div id="search-bar">
        <input
          type="text"
          id="search-input"
          placeholder="Search Movie Database"
          onChange={handleChange}
          value={query}
        />
        <button type="button" id="search-btn" onClick={() => props.searchFn(query)}>
          Search
        </button>
      </div>
      <div id="results"></div>
    </div>
  );
};
// const domContainer = document.querySelector("#react-component");
// const root = ReactDOM.createRoot(domContainer);
// // root.render(e(LikeButton));
// // root.render(e(App));
// root.render(e(SearchInput));
export { MovieSearchBar };
