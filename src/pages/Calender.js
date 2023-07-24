import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar";
import axios from "axios";
import "../styles/calender.css";
const Calender = () => {
  const [dataTable, setTable] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7283/api/Match/ProcessMatching")
      .then((response) => {
        setTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  
  const getDataForDate = (date) => {
    const formattedDate = formatDate(date);
    const matchingData = dataTable.find((item) =>
      item.match.dateOfPersonalMeeting.includes(formattedDate)
    );

    if (matchingData) {
      const maleChild = matchingData?.maleChildren[0]?.user_name;
      const femaleChild = matchingData?.femaleChildren[0]?.user_name;

      if (maleChild && femaleChild) {
        // Here, you can customize what data to display for the specific date
        return `Meeting with ${maleChild} and ${femaleChild}`;
      }
    }
    return "";
  };
  const isSaturdayOrFriday = (date) => {
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    return dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday
  };
  // Custom tile class name function to add custom CSS classes to each tile
  const tileClassName = ({ date }) => {
    // const hasData = !!getDataForDate(date);
    // return hasData ? "tile-with-data" : "";
    const hasData = !!getDataForDate(date);
    const isSatOrFri = isSaturdayOrFriday(date);

    const isSunday = date.getDay() === 0;
  return `calendar-tile ${hasData ? "tile-with-data" : ""} ${isSatOrFri ? "red-date" : ""} ${isSunday ? "black-date" : ""}`;

  };

  // Custom tile content function to render data below the date
  const tileContent = ({ date }) => (
    <p className="data">{getDataForDate(date)}</p>
  );

  return (
    <div className="calendar-container">
      <NavBar />
      <div className="calendar-container largeCalender">
        <Calendar tileClassName={tileClassName} tileContent={tileContent} />
      </div>
    </div>
  );
};

export default Calender;
