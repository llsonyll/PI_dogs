import "./home.scss";
import SearchBar from "../../components/SearchBar";
import BreedCard from "../../components/BreedCard";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/SideBar";
import { useState, useEffect } from "react";
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
  const [searchCriteria, setSearchCriteria] = useState("");
  const breeds = useSelector((state) => state.breeds);
  const filtersActive = useSelector((state) => state.filtersActive);
  const filteredBreeds = useSelector((state) => state.filteredBreeds);
  const loadingBreeds = useSelector((state) => state.loadingBreeds);
  const emptyBreeds = useSelector((state) => state.emptyBreeds);
  const page = useSelector((state) => state.page);
  const [errorAPI, setErrorAPI] = useState(false);

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(prevPage());
  };

  const handleSearchInput = (searchText) => {
    if (searchCriteria === searchText) return;
    setSearchCriteria(searchText);
  };

  useEffect(() => {
    console.log("Error del API");
  }, [errorAPI]);

  useEffect(() => {
    console.log("page useEffect", page);
    if (searchCriteria === "") {
      dispatch(getBreeds(page - 1)).then(({ error }) => {
        if (error) {
          console.log(error);
          setErrorAPI(true);
        }
      });
    } else {
      dispatch(getBreedByName(searchCriteria)).then(({ error }) => {
        if (error) {
          console.log("Error en la solicitud");
          setErrorAPI(true);
        }
      });
    }
  }, [searchCriteria, page, dispatch]);

  useEffect(() => {
    if (breeds.length === 0 && !emptyBreeds) {
      console.log("initDispatch");
      dispatch(getBreeds(page - 1)).then(({ error }) => {
        if (error) {
          setErrorAPI(true);
        }
      });
      dispatch(getTemperaments()).then(({ error }) => {
        if (error) {
          setErrorAPI(true);
        }
      });
    }
  }, [breeds, dispatch, page, emptyBreeds]);

  return (
    <div className="home">
      <div className="content">
        <Sidebar />
        <div className="main">
          <SearchBar handleInput={handleSearchInput} />
          {loadingBreeds ? (
            <div className="loadingContainer">
              <Spinner />
            </div>
          ) : (
            <div className="cardsContainer">
              {filtersActive && filteredBreeds.length === 0 ? (
                <div className="">
                  No hay razas con los filtros seleccionados
                </div>
              ) : !filtersActive && emptyBreeds ? (
                <div className="">No hay razas registradas</div>
              ) : !filtersActive && breeds.length > 0 ? (
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
            disableNext={loadingBreeds || breeds.length !== 8}
            page={breeds.length > 8 ? 1 : page}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
