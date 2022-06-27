import "./home.scss";
// import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import BreedCard from "../../components/BreedCard";
import Spinner from "../../components/Spinner";
// import { breeds } from "../../constants/data";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getBreedByName, getBreeds } from "../../actions";

// Icons
import { MdDoubleArrow, MdArrowRight, MdArrowLeft } from "react-icons/md";

const Home = () => {
  const [sbOpen, setSbOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const breeds = useSelector((state) => state.breeds);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleSearchInput = async () => {};

  useEffect(() => {
    console.log("dispatch home temperaments");
    dispatch(getBreeds(page - 1));
    dispatch(getTemperaments());
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getBreeds(page - 1));
    setIsLoading(false);
  }, [dispatch, page]);

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
            <Spinner />
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
