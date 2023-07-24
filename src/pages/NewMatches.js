import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/newmatches.css";
import LeftSlider from "../components/LeftSlider";
import axios from "axios";
import { Link } from "react-router-dom";

const NewMatches = () => {
  useEffect(() => {
    axios
      .get("https://localhost:7283/api/Match")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [data, setData] = useState([]);
  return (
    <div className="container" >
      <NavBar />
      <div style={{display:'flex'}}>
      <LeftSlider />
      <div className="sectionMain" >
        <div style={{ margin:'auto' }}>
          <h3 className="userstext py-1">Candidate</h3>
          <h3 className="usersdescription ">
            Enter one or more of the following details to find a user
          </h3>
        
          <table className="table" id="table">
            <thead>
              <tr style={{fontSize:'2rem'}}>
                <th>Match ID:</th>
                <th>Male Name</th>
                <th>Female Name</th>
                <th>Percentage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {data.map((item, index) => {
                return (
                    <>
                  <tr>
                    <td className="td">{item.match.id}</td>
                    <td className="td">{item.maleChildren[0].user_name}</td>
                    <td className="td">{item.femaleChildren[0].user_name}</td>
                    <td className="td">{item.match.match_Rating}</td>
                    <td className="td"><Link to="/detectedmatch" style={{color:'black'}} state={item}>Click Here</Link></td>                      
                  </tr>
                    </>
                );
              })}
            </tbody>
          </table>
        </div>
       
      </div>
      </div>
    </div>
  );
};

export default NewMatches;
