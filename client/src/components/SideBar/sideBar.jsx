import "./sideBar.scss";
import Spinner from "../Spinner";
import { useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const [sbOpen, setSbOpen] = useState(true);
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const sideBarContentStyle = {
    justifyContent: temperaments.length > 0 ? "flex-start" : "center",
    alignItems: temperaments.length > 0 ? "flex-start" : "center",
  };

  return (
    <div className={sbOpen ? "sideBar opened" : "sideBar closed"}>
      <div className="sideBar__desktop" style={sideBarContentStyle}>
        {temperaments.length > 0 ? (
          <div className="sideBar__desktop__content">
            <button
              onClick={() => setSbOpen(!sbOpen)}
              className="sideBar__toggle"
            >
              <MdDoubleArrow />
            </button>

            <div className="title">Filtrar Contenido</div>

            <div className="filters">
              <div className="filter">
                <div className="name">Mis Razas</div>
                <label htmlFor="">
                  <input type="checkbox" /> Raza personalizada
                </label>
              </div>

              <div className="filter">
                <div className="name">Temperamentos</div>
                {temperaments.map((t) => {
                  return (
                    <label htmlFor="" key={t.id}>
                      <input type="checkbox" /> {t.name}
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
