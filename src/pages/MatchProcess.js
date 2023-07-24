import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LeftSlider from "../components/LeftSlider";
import "../styles/matchprocess.css";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios";
import { RiCheckLine } from "react-icons/ri"; // Import the tick icon
import cross from "../assests/cross.png";
import { ToastContainer, toast } from "react-toastify";

const MatchProcess = () => {
  const [value, onChange] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState();
  const [showToast1, setShowToast1] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showCloseToast, setShowCloseToast] = useState(false);
  const [dataTable, setTable] = useState();
  function formatDate(matchDate) {
    const date = new Date(matchDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
  }
  const handleDateClick = (item) => {
    setSelectedRow(item);
    setShowToast1(!showToast1);
  };

  const submitAction = async (id) => {
    setShowToast1(false);
    const objectData = {
      id: id.match.match_id,
      weddingDate: value,
    };
    try {
      var response = await axios.post(
        `https://localhost:7283/api/Match/WeedingDate`,
        objectData
      );
      toast.success("Wedding Date added", {
        position: "top-left",
      });
    } catch (error) {
      console.log(error);
      setShowCalender(false);
      toast.error("Failed", {
        position: "top-left",
      });
    }
  };

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

  const closeconfirmToast = async (item) => { 
    await axios
      .post(`https://localhost:7283/api/User/Remove/${item.match.match_id}`,)
      .then((response) => {
        setTable((prevTable) => prevTable.filter((rowData) => rowData.match.match_id !== item.match.match_id));
        console.log(response.data);
        toast.success("Deleted Successfully", {
          position: "top-left",
        });
      })
      .catch((error) => {
        toast.success(error, {
          position: "top-left",
        });
      });
    setShowCloseToast(false);
    setShowCalender(false);
    setShowToast1(false);
  };
  return (
    <div className="container">
      <ToastContainer />
      <NavBar />
      {/* Toast 1 start Here */}
      <div className="toastSection">
        {showToast1 && (
          <div
            id="clicktoast1"
            class="mytoastt nondisplay"
            style={{
              backgroundColor: "#f6e39c",
              padding: "0px 30px",
              marginBottom: "20px",
            }}
          >
            <div
              className="closetoastcross"
              onClick={() => {
                setShowToast1(false);
              }}
            >
              <img src={cross} height={25} width={25} />
            </div>
            <div class="d-flex">
              <p class="mytoastText boldClass">Male Name : </p>
              <b class="mytoastText ">
                {selectedRow.maleChildren[0].user_name}
              </b>
            </div>
            <div class="d-flex">
              <p class="mytoastText boldClass">Female Name:</p>
              <b class="mytoastText pl-2">
                {selectedRow.femaleChildren[0].user_name}
              </b>
            </div>
            <div class="d-flex">
              <p class="mytoastText boldClass">Match Date:</p>
              <b class="mytoastText">
                {formatDate(selectedRow.match.matchDate)}
              </b>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p class="mytoastText boldClass">Wedding Date : </p>
              <b
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowCalender(true);
                }}
              >
                {" "}
                Click Here
                {selectedRow.WeddingDate}
              </b>
              {showCalender && (
                <div style={{ position: "absolute" }} className="thiscalendar">
                  <div
                    style={{ display: "flex", justifyContent: "flex-end" }}
                    onClick={() => setShowCalender(false)}
                  >
                    <img src={cross} height={25} width={25} />
                  </div>
                  <Calendar
                    className="maincalender"
                    onChange={onChange}
                    value={value}
                  />
                  <div className="buttonContainer">
                    <button
                      className="customButton"
                      onClick={() => submitAction(selectedRow)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", marginTop: "0.8rem" }}>
              <p style={{ fontWeight: "bolder" }}>
                To end a match and choose the new match
              </p>
              <p
                onClick={() => {
                  setShowCloseToast(true);
                }}
                style={{
                  marginLeft: "1rem",
                  fontWeight: "100",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Click Here
              </p>
            </div>
            {showCloseToast && (
              <div
                class="mytoast2"
                id="closetoast"
                style={{ position: "absolute" }}
              >
                <div
                  className="closetoastcross"
                  onClick={() => {
                    setShowCloseToast(false);
                  }}
                >
                  <img src={cross} height={25} width={25} />
                </div>
                <p>Do you want to End a Process</p>
                <h3
                  style={{ color: "#2F5496", textDecoration: "underline",cursor:'pointer' }}
                  onClick={() => closeconfirmToast(selectedRow)}
                >
                  Confirm
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Main Section Start Here */}
      <div className="mainSectionprocess">
        <div>
          <LeftSlider />
        </div>
        <div>
          <h3 style={{ marginLeft: "2rem" }} class="userstext">
            Candidates
          </h3>
          <h3 class="usersdescription" style={{ marginLeft: "2rem" }}>
            Enter one or more of the following details to find a Candidate:
          </h3>
          <table
            style={{ marginLeft: "3rem", marginTop: "3rem" }}
            class="table"
            id="table"
          >
            <thead>
              <tr>
                <th className="matchth">Matching Number:</th>
                <th className="matchth">Male Name</th>
                <th className="matchth">Female Name</th>
                <th className="matchth">Match Rating</th>
                <th className="matchth">Match Date</th>
                <th className="matchth">Meeting Date</th>
                <th className="matchth">Meeting Summary</th>
                <th className="matchth">Status</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {dataTable &&
                dataTable.map((item, index) => {
                  const formattedDate = formatDate(item.match.matchDate);
                  const DateOFPersonal = formatDate(
                    item.match.dateOfPersonalMeeting
                  );
                  return (
                    <>
                      <tr>
                        <td className="tdmatchprocess">
                          {item.match.match_id}
                        </td>
                        <td className="tdmatchprocess">
                          {item.maleChildren[0].user_name}
                        </td>
                        <td className="tdmatchprocess">
                          {item.femaleChildren[0].user_name}
                        </td>
                        <td className="tdmatchprocess">
                          {item.match.match_Rating}
                        </td>
                        <td className="tdmatchprocess">{formattedDate}</td>
                        <td className="tdmatchprocess">{DateOFPersonal}</td>
                        <td className="tdmatchprocess">
                          {item.match.meeting_summary_match != null ? (
                            <RiCheckLine /> // Render the tick icon
                          ) : (
                            <Link
                              style={{ color: "blue" }}
                              to="/meetingsummary"
                              state={item}
                            >
                              Click Here
                            </Link>
                          )}
                        </td>
                        <td
                          onClick={() => handleDateClick(item)}
                          style={{ color: "blue", cursor: "pointer" }}
                          className="tdmatchprocess"
                        >
                          Click Here
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MatchProcess;
