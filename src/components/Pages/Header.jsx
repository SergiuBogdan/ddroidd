import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={classes.logoText}>
          <h1>Autumn - Winter Bootcamp</h1>
        </div>
        <div className={classes.btnJoinUs}>
          <Link to="/form">
            {isHomePage && (
              <button className={classes.button}>
                <span> Join Us </span>
              </button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
