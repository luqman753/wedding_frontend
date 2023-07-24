
import NavBar from "../components/NavBar";
import "../styles/notifications.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from "react-router-dom";

import React,{useEffect, useState} from "react";
const Notifications = () => {
  // useEffect(() => {
  //   toast.success("Logged in Successfully!", {
  //     position: "top-left" // Specify the position as top-left
  //   });
  // }, [])

  const [data, setData]= useState();
  const [meetingData, setMeetingData]=useState();
  useEffect(()=>{
    axios
    .get("https://localhost:7283/api/Match/Count")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    axios
    .get("https://localhost:7283/api/Match/BullitenRequest")
    .then((response) => {
      setMeetingData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  
  return (
    <div className="container">
      <ToastContainer />
      <NavBar />
      <div className="mymainSection">
        <div className="notifcationContainer">
          <h1 className="notificationText">Notification Panel</h1>
        </div>
        <div className="card">
          <h3 className="cardTopText">Bulletin Board</h3>
          <h3 className="description">
            {data && 
              <>There are {data.count} new matches</>}
               {/* // return <>Match Found {item.maleChildren[0].user_name  }
              // {' '}& {item.femaleChildren[0].user_name   } {' '} with Success Rating {item.match.match_Rating}
              // <br/></> */}
            
                        <Link  className="clickhere" to="/newmatches">
              { ' '}Click here
              </Link>
          </h3>
        </div>
        <div className="card">
          <h3 className="cardTopText">New Requests</h3>
          <h3 className="description">
          {meetingData &&
          meetingData.map((item)=>{
              return <>Match Found {item.maleChildren[0].user_name  }
              {' '}& {item.femaleChildren[0].user_name   } {' '} with Success Rating {item.match.match_Rating}
             {' '}<Link to="/meetingsummary"className="clickhere" state={item}>Click Here</Link> <br/></>})}
            
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
