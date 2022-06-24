import "./searchBar.scss";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const SearchBar = ({ placeholder = "Buscar Raza", handleInput }) => {
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
    // handleInput(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        className="searchBar__input"
        type="text"
        name="searchText"
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <IconContext.Provider value={{ className: "searchBar__icon" }}>
        <FaSearch />
      </IconContext.Provider>
    </div>
  );
};

export default SearchBar;
