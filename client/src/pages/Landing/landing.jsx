import "./landing.scss";
import DogsLogo from "../../assets/dog.png";

// React-Icons
import { IconContext } from "react-icons";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiPostgresql } from "react-icons/si";

// Components
import NavBar from "../../components/NavBar";
import RouteButton from "../../components/RouteButton";

const Landing = () => {
  return (
    <div className="landing">
      <NavBar />
      <div className="landing__content">
        <div className="landing__content__main">
          <img src={DogsLogo} alt="dogsLogo" />
          <div className="title">DOGS API</div>
          <div className="subtitle"> HENRY INDIVIDUAL PROJECT</div>
          <RouteButton text="Iniciar" route="home" />
        </div>
        <div className="landing__content__footer">
          <div className="icons">
            <IconContext.Provider value={{ color: "black", size: "1.8rem" }}>
              <SiPostgresql />
              <SiExpress />
              <FaReact />
              <FaNodeJs />
            </IconContext.Provider>
          </div>
          <span>
            {" "}
            by{" "}
            <a
              href="https://github.com/llsonyll"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              llsonyll{" "}
            </a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
