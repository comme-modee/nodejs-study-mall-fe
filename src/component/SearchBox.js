import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({ searchQuery, setSearchQuery, placeholder, field }) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  const onCheckEnter = () => {
      setSearchQuery({ ...searchQuery, page: 1, [field]: keyword });
  };
  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder={placeholder}
        onKeyUp={onCheckEnter}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
    </div>
  );
};

export default SearchBox;
