import "./navBar.scss";
import HenryLogo from "../../assets/henry.png";
import DogsLogo from "../../assets/dog.png";

import { Link, NavLink, useRouteMatch, useLocation } from "react-router-dom";

const NavBar = () => {
  const match = useRouteMatch("/breed/form");
  const { pathname } = useLocation();
  const isLanding = pathname === "/";
  const title = () => {
    const [slash, route, description] = pathname.split("/");
    switch (route) {
      case "home":
        return "Home";
      case "breed":
        if (description === "form") {
          return "New Breed";
        }
        return "Breed Details";
      default:
        return "Home";
    }
  };

  const propStyle = {
    alignItems: "center",
    justifyContent: isLanding ? "center" : "space-between",
  };

  return (
    <>
      <div className="navBar" style={propStyle}>
        {isLanding ? (
          <img src={HenryLogo} alt="henryLogo" className="navBar__logo" />
        ) : (
          <>
            <Link to="/home" className="navBar__title">
              <img src={DogsLogo} alt="dogs" className="img" />
              <div className="text"> {title()}</div>
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
    </>
  );
};

export default NavBar;
