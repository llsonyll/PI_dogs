import "./home.scss";
// import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import BreedCard from "../../components/BreedCard";
import Spinner from "../../components/Spinner";
// import { breeds } from "../../constants/data";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  getBreedByName,
  getBreeds,
  nextPage,
  prevPage,
} from "../../actions";

// Icons
import { MdDoubleArrow, MdArrowRight, MdArrowLeft } from "react-icons/md";

const Home = () => {
  const [sbOpen, setSbOpen] = useState(true);
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const breeds = useSelector((state) => state.breeds);
  const page = useSelector((state) => state.page);
  const loadingBreeds = useSelector((state) => state.loadingBreeds);

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(prevPage());
  };

  const handleSearchInput = async () => {};

  useEffect(() => {
    if (breeds.length <= 0) {
      // console.log(breeds.length);
      dispatch(getBreeds(page - 1));
    }

    if (temperaments.length <= 0) {
      // console.log(temperaments.length);
      dispatch(getTemperaments());
    }
  }, []);

  useEffect(() => {
    console.log("page dispatch");
    dispatch(getBreeds(page - 1));
  }, [page, dispatch]);

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
          {loadingBreeds ? (
            <div className="loadingContainer">
              <Spinner />
            </div>
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
              disabled={page <= 1 || loadingBreeds}
            >
              <MdArrowLeft />
            </button>
            {page}
            <button
              onClick={handleNextPage}
              disabled={loadingBreeds || breeds.length < 8}
            >
              <MdArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
