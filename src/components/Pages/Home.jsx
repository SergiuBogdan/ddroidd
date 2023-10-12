import { Link } from "react-router-dom";
import cssLogo from "../../assets/css.png";
import htmlLogo from "../../assets/html.png";
import javascriptLogo from "../../assets/javascript.png";
import reactLogo from "../../assets/react.png";

import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.firstSection}>
          <div className={classes.textLeft}>
            <p className={classes.textStyle}>
              const {"{"}
              <img src={htmlLogo} alt="HTML" />, <img src={cssLogo} alt="CSS" />
              , <img src={javascriptLogo} alt="JavaScript" />,{" "}
              <img src={reactLogo} alt="React" />
              {"}"} =
            </p>
          </div>

          <div className={classes.webContainer}>
            <div className={classes.firstRow}>
              <div className={classes.firstSquare}></div>
              <div className={classes.secondSquare}></div>
            </div>
            <div className={classes.secondRow}></div>
            <div className={classes.thirdRow}>
              <div className={classes.firstSquareThirdRow}></div>
              <div className={classes.secondSquareThirdRow}></div>
              <div className={classes.thirdSquareThirdRow}></div>
            </div>
          </div>
        </div>
        <div className={classes.btnJoinUs}>
          <Link to="/form">
            <button className={classes.button}>
              <span> Join Us </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
