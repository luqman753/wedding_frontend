import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/leftSlider.css";

const LeftSlider = ({ personalmeeting }) => {
  const location = useLocation();
  const isActive = (paths) => {
    return paths.some((path) => location.pathname === path)
      ? "activebutton"
      : "";
  };
  return (
    <div className="leftSlider">
      {personalmeeting == "personalmeeting" ? (
        <Link>
          <button
            className={`button ${isActive(["/candidates/personalinfo"])}`}
          >
            Personal Informations
          </button>
        </Link>
      ) : 
        <>
          <Link to="/newmatches">
            <button
              className={`button ${isActive([
                "/newmatches",
                "/detectedmatch",
              ])}`}
            >
              New matches
            </button>
          </Link>
          <Link to="/matchprocess">
            <button
              className={`button ${isActive([
                "/matchprocess",
                "/meetingsummary",
              ])}`}
            >
              Matchmaking in progress
            </button>
          </Link>
          <Link to="/endprocess">
            <button className={`button ${isActive(["/endprocess"])}`}>
              Ended matchmaking
            </button>
          </Link>{" "}
          
        </>
      }
    </div>
  );
};

export default LeftSlider;
