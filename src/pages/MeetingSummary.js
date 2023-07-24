import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import LeftSlider from "../components/LeftSlider";
import "../styles/meetingsummary.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const MeetingSummary = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const [meetingSummary, setMeetingSummary] = useState();
  const handleTextareaChange = (event) => {
    setMeetingSummary(event.target.value);
  };
  const submitAction = async () => {
    console.log(data);
    const objectData = {
      match_id: data.match.match_id,
      meeting_summary_match: meetingSummary,
    };
    await axios
      .post(`https://localhost:7283/api/Match/MeetingSummary`, objectData)
      .then((response) => {
        toast.success("Success", {
          position: "top-left", // Specify the position as top-left
        });
        console.log("response", response.data);
      })
      .catch((error) => {
        toast.success("Summary Entered Successfully", {
          position: "top-left", // Specify the position as top-left
        });
        console.log(error);
      });
  };
  return (
    <div className="container">
      <ToastContainer />
      <NavBar />
      <div className="mainSection">
      <LeftSlider />
        <div className="rightContainer">
          <h3 className="matchText">Match</h3>
          <h3 className="matchdescription">The System Detected a Match</h3>
          <h3 className="matchidstring">Match Rating , Match ID</h3>
          <div className="matchContainer">
            <div className="matchSection">
              <div className="matchuser1">
                <h3 className="fontsmatch">User_ID :{data.match.id}</h3>
                <h3 className="fontsmatch">
                  First Name : {data.maleChildren[0].user_name}
                </h3>
                <h3 className="fontsmatch">
                  num_group : {data.maleChildren[0].num_Gro}
                </h3>
                <h3 className="fontsmatch">
                  Emp_Name : {data.maleChildren[0].user_name}
                </h3>
              </div>
              <div className="matchuser2">
                <h3 className="fontsmatch">User_ID : {data.match.id}</h3>
                <h3 className="fontsmatch">
                  First Name: {data.femaleChildren[0].user_name}
                </h3>
                <h3 className="fontsmatch">
                  num_group: {data.femaleChildren[0].num_Gro}
                </h3>
                <h3 className="fontsmatch">
                  {" "}
                  Emp_Name: {data.femaleChildren[0].user_name}
                </h3>
              </div>
            </div>
          </div>
          <div className="bottomContainer">
            <textarea
              name="textarea"
              cols="100"
              rows="10"
              placeholder="Enter Meeting Summary..."
              value={meetingSummary}
              onChange={handleTextareaChange}
            ></textarea>
            <button className="button" onClick={submitAction}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
