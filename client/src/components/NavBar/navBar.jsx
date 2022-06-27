import "./navBar.scss";
import HenryLogo from "../../assets/henry.png";
import DogsLogo from "../../assets/dog.png";

import { Link, NavLink, useRouteMatch } from "react-router-dom";

const NavBar = ({ align, justify, landing = true, title }) => {
  const propStyle = {
    alignItems: align ?? "center",
    justifyContent: justify ?? "center",
  };

  const match = useRouteMatch("/breed/form");

  return (
    <div className="navBar" style={propStyle}>
      {landing ? (
        <img src={HenryLogo} alt="henryLogo" className="navBar__logo" />
      ) : (
        <>
          <Link to="/home" className="navBar__title">
            <img src={DogsLogo} alt="dogs" className="img" />
            <div className="text"> {title ?? "Home"}</div>
          </Link>
          <div className="navBar__options--desktop">
            {!match ? (
              <NavLink to="/breed/form" className="navlink">
                New Breed
              </NavLink>
            ) : null}
            <img src={HenryLogo} alt="henryLogo" className="navBar__henry" />
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
