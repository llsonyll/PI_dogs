import "./navBar.scss";
import HenryLogo from "../../assets/henry.png";
import DogsLogo from "../../assets/dog.png";

import { Link, NavLink, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSbState } from "../../actions";

import { BiMenu } from "react-icons/bi";

const NavBar = () => {
  const match = useRouteMatch("/breed/form");
  const matchHome = useRouteMatch("/home");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const sbState = useSelector((state) => state.sbState);
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

  const toggleSbState = () => {
    dispatch(setSbState(!sbState));
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
            <div className="navBar__options--mobile">
              {!match ? (
                <NavLink to="/breed/form" className="navlink">
                  New Breed
                </NavLink>
              ) : null}
              {matchHome ? (
                <button onClick={toggleSbState}>
                  <BiMenu />
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;
