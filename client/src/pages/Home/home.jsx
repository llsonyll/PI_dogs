import "./home.scss";
// import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import BreedCard from "../../components/BreedCard";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/SideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  getBreedByName,
  getBreeds,
  nextPage,
  prevPage,
} from "../../actions";

const Home = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const breeds = useSelector((state) => state.breeds);
  const filtersActive = useSelector((state) => state.filtersActive);
  const filteredBreeds = useSelector((state) => state.filteredBreeds);
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
      dispatch(getBreeds(page - 1));
    }

    if (temperaments.length <= 0) {
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
        <Sidebar />

        <div className="main">
          <SearchBar />
          {loadingBreeds ? (
            <div className="loadingContainer">
              <Spinner />
            </div>
          ) : (
            <div className="cardsContainer">
              {filtersActive && filteredBreeds.length === 0 ? (
                <div className="">
                  {" "}
                  No hay razas con los temperamentos seleccionados{" "}
                </div>
              ) : !filtersActive && filteredBreeds.length === 0 ? (
                breeds.map((breed) => {
                  return (
                    <BreedCard
                      breed={breed}
                      key={`${breed.id}-${breed.name}`}
                    />
                  );
                })
              ) : (
                filteredBreeds.map((breed) => {
                  return (
                    <BreedCard
                      breed={breed}
                      key={`${breed.id}-${breed.name}`}
                    />
                  );
                })
              )}
            </div>
          )}
          <Pagination
            handlePreviousPage={handlePreviousPage}
            disablePrev={loadingBreeds}
            handleNextPage={handleNextPage}
            disableNext={loadingBreeds || breeds.length < 8}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
