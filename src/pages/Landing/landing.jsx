import "./landing.scss";
import DogsLogo from "../../assets/dog.png";

// React-Icons
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiPostgresql } from "react-icons/si";

// Components
import RouteButton from "../../components/RouteButton";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__content">
        <div className="landing__content__main">
          <img src={DogsLogo} alt="dogsLogo" className="dogsLogo" />
          <div className="title">DOGS API</div>
          <div className="subtitle"> HENRY INDIVIDUAL PROJECT</div>
          <RouteButton text="Iniciar" route="home" />
        </div>
        <div className="landing__content__footer">
          <div className="icons">
            <SiPostgresql />
            <SiExpress />
            <FaReact />
            <FaNodeJs />
          </div>
          <span>
            by
            <a
              href="https://github.com/llsonyll"
              target="_blank"
              rel="noreferrer"
            >
              llsonyll
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
