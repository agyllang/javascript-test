"use strict";
import { useState, FC, ReactElement } from "react";
interface SearchProps {
  searchFn:  ((query: string) => void)
}

const MovieSearchBar: React.FC<SearchProps> = (props): React.ReactElement => {
  const [query, setQuery] = useState("");
  // console.log("query",query)
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    // const searchQuery: string = target.value.toLowerCase();
    const inputValue: string = target.value
    // props.searchFn(searchQuery)
    setQuery(inputValue);
    // console.log("searching for",searchQuery)
    
  };


  return (
    <div>
      <div id="search-bar">
        <input
          type="text"
          className="input search"
          placeholder="Search Movie Database"
          onChange={handleChange}
          // value={query}

        />
        <button type="button" className="btn search" onClick={() => props.searchFn(query)}>
          Search
        </button>
      </div>
    </div>
  );
};
// const domContainer = document.querySelector("#react-component");
// const root = ReactDOM.createRoot(domContainer);
// // root.render(e(LikeButton));
// // root.render(e(App));
// root.render(e(SearchInput));
export { MovieSearchBar };
