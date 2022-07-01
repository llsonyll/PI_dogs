import "./sideBar.scss";
import Spinner from "../Spinner";
import { useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterBreeds } from "../../actions";

const SideBar = () => {
  const [sbOpen, setSbOpen] = useState(true);
  const dispatch = useDispatch();

  const { breedFilters: filters, myBreedsFilter } = useSelector(
    (state) => state.filters
  );

  const temperaments = useSelector((state) =>
    state.temperaments.sort((a, b) => a.name.localeCompare(b.name))
  );

  const handleCheckInput = (e, temperament) => {
    if (e.target.checked) {
      dispatch(
        filterBreeds({ filters: [...filters, temperament], myBreedsFilter })
      );
    } else {
      dispatch(
        filterBreeds({
          filters: filters.filter((t) => t.id !== temperament.id),
          myBreedsFilter,
        })
      );
    }
  };

  const handleMyBreedsFilter = (e) => {
    dispatch(filterBreeds({ filters, myBreedsFilter: e.target.checked }));
  };

  // const sideBarContentStyle = {
  //   justifyContent: temperaments.length > 0 ? "flex-start" : "center",
  //   alignItems: temperaments.length > 0 ? "flex-start" : "center",
  // };

  return (
    <div className="sideBar">
      <div className="sideBar__desktop">
        {temperaments.length > 0 ? (
          <div className="sideBar__desktop__content">
            <div className="header">
              <div className="title">Filtros </div>
              {/* <button className="toggle" onClick={() => setSbOpen(!sbOpen)}>
                <MdDoubleArrow />
              </button> */}
            </div>

            <div className="filters">
              <div className="filter">
                <div className="name">Mis Razas</div>
                <label className="container">
                  Raza personalizada
                  <input
                    type="checkbox"
                    checked={myBreedsFilter}
                    onChange={handleMyBreedsFilter}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="filter">
                <div className="name">Temperamentos</div>
                {temperaments.map((t) => {
                  return (
                    <label key={t.id} className="container">
                      {t.name}
                      <input
                        type="checkbox"
                        checked={t.selected}
                        onChange={(e) => handleCheckInput(e, t)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default SideBar;
