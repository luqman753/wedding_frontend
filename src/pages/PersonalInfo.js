import React,{useState} from "react";
import NavBar from "../components/NavBar";
import LeftSlider from "../components/LeftSlider";
import "../styles/personalinfor.css";
import { useLocation } from "react-router-dom";

import medicalinformation from '../assests/medicalInformation.pdf'
const PersonalInfo = () => {

  const location = useLocation();
  const [data, setData] = useState(location.state);
  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'medicalinformation';

    link.href = medicalinformation;

    link.click();
  };


  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftSlider personalmeeting={"personalmeeting"} />
        <div className="personalContainer">
            <h4 className="personalInformationText">Personal Information</h4>
            <div className="personalinfoUser">
                <h4 className="personaluserText">First Name: {data.user_name}</h4>
                <h4 className="personaluserText">Last Name: {data.user_lastName}</h4>
                <h4 className="personaluserText">Group: {data.num_Gro}</h4>
                <h4 className="personaluserText">Employee: {data.user_phone}</h4>
            </div>
        </div>
        <div className="buttonsContainer">
        {/* <a
        href={medicalinformation}
        download="medicalinformation"
        target="_blank"
        rel="noreferrer"
      > */}
                <button className="bottomButton" onClick={handleDownload}>Medical Information</button>  
                 {/* </a> */}
                <h1>Scores</h1>
                {data.daily_func_score}
                {data.readliness_relationship_score}
            </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
