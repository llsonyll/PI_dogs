import "./home.scss";
// import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import BreedCard from "../../components/BreedCard";
import { breeds } from "../../constants/data";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../actions";

// Icons
import { MdDoubleArrow, MdArrowRight, MdArrowLeft } from "react-icons/md";

const Home = () => {
  const [sbOpen, setSbOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const handleNextPage = () => {
    console.log(temperaments);
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleSearchInput = async () => {};

  useEffect(() => {
    console.log("dispatch home temperaments");
    console.log(temperaments);
  }, [temperaments]);

  return (
    <div className="home">
      <NavBar landing={false} justify="space-between" />
      <div className="content">
        <div className={sbOpen ? "sidebar opened" : "sidebar closed"}>
          <button
            onClick={() => setSbOpen(!sbOpen)}
            className="sidebar__toggle"
          >
            <MdDoubleArrow />
          </button>
        </div>

        <div className="main">
          <SearchBar />
          {isLoading ? (
            <div className="loadingBox"></div>
          ) : (
            <div className="cardsContainer">
              {breeds.map((breed) => {
                return <BreedCard breed={breed} key={breed.id} />;
              })}
            </div>
          )}
          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={page <= 1 || isLoading}
            >
              <MdArrowLeft />
            </button>
            {page}
            <button onClick={handleNextPage} disabled={isLoading}>
              <MdArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
