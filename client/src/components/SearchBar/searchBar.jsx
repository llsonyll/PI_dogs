import "./searchBar.scss";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const SearchBar = ({ placeholder = "Buscar Raza", handleInput }) => {
  const [input, setInput] = useState("");
  const [sent, setSent] = useState(false);
  const handleInputChange = (e) => {
    setSent(false);
    setInput(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!sent) {
        console.log("Input Delayed", input);
        handleInput(input);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [input, sent, handleInput]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Input submitted", input);
    handleInput(input);
    setSent(true);
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleFormSubmit}>
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
      </form>
    </div>
  );
};

export default SearchBar;
