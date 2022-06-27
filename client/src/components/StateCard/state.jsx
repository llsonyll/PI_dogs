import "./state.scss";
import { FaCheckCircle } from "react-icons/fa";
import { TbCircleX } from "react-icons/tb";

import { IconContext } from "react-icons";

const State = ({ success = true }) => {
  return (
    <div className="state">
      <div className="icon">
        <IconContext.Provider
          value={{ color: success ? "#00900E" : "#FF0000", size: "104px" }}
        >
          {success ? <FaCheckCircle /> : <TbCircleX />}
        </IconContext.Provider>
      </div>
      <div className="title"> {success ? "Exito" : "Error"}</div>
      <div className="message">
        {" "}
        {success
          ? "La nueva raza se ha creado con exito"
          : "Algo a ido mal, intentalo nuevamente"}
      </div>
    </div>
  );
};

export default State;
