import React from 'react'
import "../styles/navbar.css"
import Picture1 from '../assests/Picture1.png'
import logo from '../assests/logo.jpg'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation();

  const isActive = (paths) => {
    return paths.some((path) => location.pathname === path) ? "activeNavBarlink" : "";
  };

  return (
    <div className="navBar">
      <div className="navBarRight">
        <img className="logo" src={logo} alt="Internet Issue" />
        <h2 className="Username">Hello MatchMaker</h2>
      </div>
      <div className="navbarMidlle center">
        <li>
          <Link to="/notifications" className={`navlink ${isActive(["/notifications"])}`}>
            Home |
          </Link>
        </li>
        <li>
          <Link to="/candidates" className={`navlink ${isActive(["/candidates","/candidates/personalinfo"])}`}>
            Candidates |
          </Link>
        </li>
        <li>
          <Link to="/newmatches" className={`navlink ${isActive(["/newmatches", "/detectedmatch","/matchprocess","/endprocess"])}`}>
            Match |
          </Link>
        </li>
        <li>
          <Link to="/calender"  className={`navlink ${isActive(["/calender"])}`}>
            Calendar |
          </Link>
        </li>
      </div>
      <div className="navBarLeft">
        <img className="picture1" src={Picture1} alt="" />
        <Link  to="/" className="navBarLeftText" style={{marginRight:"2rem",fontSize:'1.5rem'}}>Log out</Link>
      </div>
      
    </div>
  );
}

export default NavBar;
