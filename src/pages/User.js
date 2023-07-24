import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import "../styles/candidates.css";
import LeftSlider from "../components/LeftSlider";
import searchImg from "../assests/search.png";
import { Link } from "react-router-dom";
const User = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7283/api/User");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Event handler for updating the search query state
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter the data based on the search query
  const filteredData = data.filter(
    (item) =>
      // item.id.toString().includes(searchQuery) || // Search by Match ID
      item.user_name.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by Male Name
      item.user_lastName.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by Female Name
      item.num_Gro.toString().toLowerCase().includes(searchQuery.toLowerCase()) // Search by Percentage
  );

  return (
    <>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftSlider personalmeeting="personalmeeting" />
        <div className="sectionMain">
          <div style={{ margin: "auto" }}>
            <h3 className="userstext py-1">Candidate</h3>
            <h3 className="usersdescription">
              Enter one or more of the following details to find a user
            </h3>
            <div style={{height:'320px',overflow:'scroll'}}>
              <table className="table" id="table">
                <thead>
                  <tr>
                    {/* <th>ID:</th> */}
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>group</th>
                    <th>Employee Name</th>
                    <th>Learn More</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {filteredData.map((item, index) => {
                    return (
                      <tr className="tdcandidaterow" key={index}>
                        {/* <td className="tdcandidate">{item.id}</td> */}
                        <td className="tdcandidate">
                          {item.user_name}
                        </td>
                        <td className="tdcandidate">
                          {item.user_lastName}
                        </td>

                        <td className="tdcandidate">
                          {item.num_Gro}
                        </td>
                      <td className="tdcandidate">
                          {item.user_phone}
                        </td>
                        <Link state={item} to="/candidates/personalinfo" style={{color:'black',cursor:'pointer'}}>
                        <td className="tdcandidate" >Click Here</td>
                        </Link>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="searchContainer">
        <input
              className="searchBox"
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
            />
          <img src={searchImg} height={30} width={30} style={{color:'orange'}}/>
        </div>
      </div>
    </>
  );
};

export default User;
