import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({ searchQuery, setSearchQuery, placeholder, field }) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || "");

  const onKeywordChanged = (e) => {
      console.log('key up')
      setSearchQuery({ ...searchQuery, page: 1, [field]: e.target.value });
  };
  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder={placeholder}
        onKeyUp={(e) => onKeywordChanged(e)}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
    </div>
  );
};

export default SearchBox;
