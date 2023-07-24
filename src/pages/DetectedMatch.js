import React, { useState, useEffect } from "react";
import "../styles/newmatches2.css";
import NavBar from "../components/NavBar";
import LeftSlider from "../components/LeftSlider";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { dummyJson } from "../dummyJson";
import imgCalender from "../assests/calendar.png"
const DetectedMatch = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const [value, onChange] = useState(new Date());
  const [calenderVisible, setCalenderVisible] = useState(false);
  const [showToastfirst, setshowToastfirst] = useState(false);
  const [showToastSecond, setshowToastSecond] = useState(false);
  const [maleData, setMaleData] = useState();
  const [femaleData, setFemaleData] = useState();
  const [showMaleData, setShowMaleData] = useState();
  const [showFemaleData, setShowFemaleData] = useState();
  const [getUserInput, setGetUserInput] = useState();
  const [maleToast, setMaleToast] = useState(false);
  const [filteredResult, setFilteredResult] = useState();
  const [calenderShow, setcalenderShow] = useState(false);

  // FIlter Function that will take two parameters of male and Female
  const handleCalenderShow = () => {
    setcalenderShow(!calenderShow);
  };
  const submitCalender = () => {
    setcalenderShow(!calenderShow);
  };
  const filterData = async (checkMale, checkFemale) => {
    const result = await dummyJson.filter(
      (item) => item.maleName === checkMale && item.femaleName === checkFemale
    );
    console.log(result)
    // it return the one object and set back into the setFilteredResult
    setFilteredResult(result);

  };
  const submitAction = async () => {
    let objectData;

    if (showMaleData || showFemaleData) {
      objectData = {
        // match_id: 99999,
        match_id: filteredResult[0].matchID,
        match_Rating: filteredResult[0].matchPercentage,
        // data.match.match_Rating.length > 0 ? data.match.match_Rating : null,
        male_id:
          showMaleData === undefined ? data.match.male_id : showMaleData.id,
        female_id:
          showFemaleData == undefined
            ? data.match.female_id
            : showFemaleData.id,

        matching_Success: data.match.matching_Success,
        meeting_summary_match: data.match.meeting_summary_match,
        weddingDate: data.match.weddingDate,
        summaryOfPersonalMeeting: "",
        dateOfPersonalMeeting: value,
      };
    } else {
      objectData = {
        match_id: data.match.id,
        male_id:
          showMaleData === undefined ? data.match.male_id : showMaleData.id,
        female_id:
          showFemaleData == undefined
            ? data.match.female_id
            : showFemaleData.id,
        match_Rating:
          data.match.match_Rating.length > 0 ? data.match.match_Rating : null,
        matching_Success: data.match.matching_Success,
        //data.match.matchDate,
        meeting_summary_match: data.match.meeting_summary_match,
        weddingDate: data.match.weddingDate,
        summaryOfPersonalMeeting: "",
        dateOfPersonalMeeting: value,
      };
      console.log(objectData);
    }
    await axios
      .post(
        `https://localhost:7283/api/Match/DateOfPersonalMeeting`,
        objectData
      )
      .then((response) => {
        if (response.data == "Data Added Successfully") {
          toast.success("Data Added Successfully", {
            position: "top-left",
          });
          setCalenderVisible(!calenderVisible);
        } else if(response.data=="Data Updated") {
          toast.success("Data Updated", {
            position: "top-left",
          });
          setCalenderVisible(!calenderVisible);
        }
      })
      .catch((error) => {
        toast.error("Error", {
          position: "top-left",
        });
        setCalenderVisible(!calenderVisible);
      });
  };
  //this useEffect will get the /getMaleMatch
  useEffect(() => {
    axios
      .get("https://localhost:7283/api/Match/GetMaleMatch")
      .then((response) => {
        setMaleData(response.data);
        toast.success("Success", {
          position: "top-left",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // this useEffect will get he /getFemaleMatch
  useEffect(() => {
    axios
      .get("https://localhost:7283/api/Match/GetFemaleMatch")
      .then((response) => {
        setFemaleData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // useEffect(() => {}, [filteredResult]);

  // Below funtion will get the Female input
  const handleSubmitID = async () => {
    await axios
      .get(`https://localhost:7283/api/Match/Female/${getUserInput}`)
      .then((response) => {
        setShowFemaleData(response.data);
        if (response.status == 204) {
          toast.error("Didn't Find", {
            position: "top-left", // Specify the position as top-left
          });
        } else {
          toast.success("Success", {
            position: "top-left", // Specify the position as top-left
          });
        }
      })
      .catch((error) => {
        toast.error("Error", {
          position: "top-left", // Specify the position as top-left
        });
      });
    setshowToastfirst(false);
    setshowToastSecond(false);
  };
  const handleInputMale = async () => {
    await axios
      .get(`https://localhost:7283/api/Match/${getUserInput}`)
      .then((response) => {
        setShowMaleData(response.data);
        if (response.status == 204) {
          toast.error("Didn't Find", {
            position: "top-left",
          });
        } else {
          toast.success("Success", {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        toast.error("Success", {
          position: "top-left",
        });
      });
    setshowToastfirst(false);
    setMaleToast(false);
  };
  const handleFemaleClick = (item) => {
    //Maleale Data not equal to null because when user click on the Female Data then otherside Female data will null it through error
    setShowFemaleData(item);
    if (showMaleData == undefined) {
      filterData(data.maleChildren[0].user_name, item.user_name);
    } else {
      filterData(showMaleData.user_name, item.user_name);
    }
    // It taes the item.user_name means current name of Female and from showMaleData state current name of male
  };
  const handMaleClick = (item) => {
    setShowMaleData(item);
    if (showFemaleData == undefined) {
      filterData(item.user_name, data.femaleChildren[0].user_name);
    } else {
      //Female Data not equal to null because when user click on the Male Data then otherside Female data will null it through error
      filterData(item.user_name, showFemaleData.user_name);
    }
  };
  const hanleManual = () => {
    setshowToastfirst(true);
  };
  const handleInputID = () => {
    setshowToastSecond(true);
  };
  const handleInputMaleID = () => {
    setMaleToast(true);
  };
  const dateObj = new Date(value);
const formattedDate = dateObj.toISOString().split('T')[0];
  return (
    <div className="container">
      <ToastContainer />
      <NavBar />

      {calenderShow && (
        <div className="calendarmeeting">
          <Calendar className="mycalender" onChange={onChange} value={value} />
          <div className="buttonContainer">
            <button onClick={submitCalender} className="customButton">
              Confirm
            </button>
          </div>
        </div>
      )}
      <div className="themainSection">
        <div>
          <LeftSlider />
        </div>
        <div style={{ marginLeft: "5rem" }}>
          <div>
            <h3 className="matchText">Match</h3>
            <h3 className="matchdescription">The System Detected a Match</h3>
            <h3 className="matchidstring">
              Match Rating:{" "}
              {filteredResult
                ? filteredResult[0].matchPercentage
                : data.match.match_Rating}
            </h3>
            <h3 className="matchidstring">
              Match ID:{" "}
              {filteredResult ? filteredResult[0].matchID : data.match.id}
            </h3>
            <div style={{ display: "flex"}}>
              <h3 className="matchidstring" style={{ marginRight: 7 }}>
                Select Meeting
              </h3>{" "}
              <div onClick={handleCalenderShow} style={{border:'2px solid #b41f31',display:'flex',alignItems:'center',borderRadius:'10px',cursor:'pointer'}}>
              <input value={formattedDate}   style={{cursor:'pointer',marginLeft:'1rem',fontSize:"1rem",border:'none',outline:'none',width:"6rem"}}/>
              <img src={imgCalender} height={30} width={30} />
              </div>
            </div>
          </div>
          <div className="rightContainer">
            <div className="matchContainer">
              <div className="matchSection">
                <div className="matchuser1">
                  <h3 className="fontsmatch">
                    User_ID:{" "}
                    {showMaleData ? showMaleData.id : data.match.male_id}
                  </h3>
                  <h3 className="fontsmatch">
                    First Name:{" "}
                    {showMaleData
                      ? showMaleData.user_name
                      : data.maleChildren[0].user_name}
                  </h3>
                  <h3 className="fontsmatch">
                    num_group:{" "}
                    {showMaleData
                      ? showMaleData.num_Gro
                      : data.maleChildren[0].num_Gro}
                  </h3>
                  <h3 className="fontsmatch">
                    Emp_Name:{" "}
                    {showMaleData
                      ? showMaleData.emplID
                      : data.maleChildren[0].user_name}
                  </h3>
                </div>
                <div>
                  <button onClick={submitAction} className="button">
                    Accept Match{" "}
                  </button>
                </div>
                <div className="matchuser2">
                  <h3 className="fontsmatch">
                    User_ID:{" "}
                    {showFemaleData ? showFemaleData.id : data.match.female_id}
                  </h3>
                  <h3 className="fontsmatch">
                    First Name:{" "}
                    {showFemaleData
                      ? showFemaleData.user_name
                      : data.femaleChildren[0].user_name}
                  </h3>
                  <h3 className="fontsmatch">
                    num_group:{" "}
                    {showFemaleData
                      ? showFemaleData.num_Gro
                      : data.femaleChildren[0].num_Gro}
                  </h3>
                  <h3 className="fontsmatch">
                    Emp_Name:{" "}
                    {showFemaleData
                      ? showFemaleData.user_name
                      : data.femaleChildren[0].user_name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Container */}
            <div
              className="bottomContainer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                marginRight: "1rem",
              }}
            >
              <div className="bottomBoxes">
                {maleData &&
                  maleData.map((item, index) => {
                    return (
                      <div className="bottomBoxesContent">
                        <h3
                          className="fontsmatch"
                          style={{ textAlign: "right" }}
                        >
                          user_id: {item.id < 10 ? `‎ ${item.id}` : item.id}
                        </h3>
                        <h3 className="fontsmatch">{item.user_name}</h3>
                        <h3
                          style={{ cursor: "pointer" }}
                          href=""
                          className="blue"
                          onClick={() => {
                            handMaleClick(item);
                          }}
                        >
                          Click here
                        </h3>
                      </div>
                    );
                  })}
              </div>
              <div className="bottomBoxes">
                {femaleData &&
                  femaleData.map((item, index) => {
                    return (
                      <div className="bottomBoxesContent">
                        <h3
                          className="fontsmatch"
                          style={{ textAlign: "right" }}
                        >
                          user_id: {item.id}
                        </h3>
                        <h3 className="fontsmatch">{item.user_name}</h3>
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleFemaleClick(item);
                          }}
                          className="blue"
                        >
                          {" "}
                          Click here
                        </h3>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* Button Div */}
            <div className="theButtonContainer">
              {showToastfirst && (
                <div id="toast1show" class="toast1 nonedisplay">
                  <p class="toastText">Who do you Perform a Manual</p>
                  <p
                    onClick={handleInputID}
                    id="clickonUserName"
                    class="toastText"
                  >
                    FeMale: Click Here
                  </p>
                  <p
                    onClick={handleInputMaleID}
                    id="clickonUserName"
                    class="toastText"
                  >
                    {" "}
                    Male: Click Here
                  </p>
                </div>
              )}
              <div className="yellowHeadLine">
                <p>
                  If there is a potential for a match that is not displayed in
                  the pressure system:
                </p>
              </div>
              <button class="manualMatch button" onClick={hanleManual}>
                {" "}
                Manual Match
              </button>
            </div>
          </div>
        </div>
        {showToastSecond && (
          <div id="toast2show" class="toast2 nonedisplay">
            <p class="toastText2">Please Enter Your ID Number</p>
            <input
              class="userInput"
              onChange={(x) => setGetUserInput(x.target.value)}
            />
            <button className="customButton" onClick={handleSubmitID}>
              Confirm
            </button>
          </div>
        )}
        {maleToast && (
          <div id="toast2show" class="toast2 nonedisplay">
            <p class="toastText2">Please Enter Your ID Number</p>
            <input
              class="userInput"
              onChange={(x) => setGetUserInput(x.target.value)}
            />
            <button className="customButton" onClick={handleInputMale}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectedMatch;
