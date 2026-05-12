import React from "react";
import { Search } from "lucide-react";

function SearchBox() {
  return (
    <div className="search-box">
      <Search />

      <span>Type</span>

      <kbd>/</kbd>

      <span>to search</span>
    </div>
  );
}

export default SearchBox;
