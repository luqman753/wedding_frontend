import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


import "../styles/home.css";
import houseimage from '../assests/housepage.jpg';

import axios  from 'axios';
const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const check=()=>{
    console.log("first")
  }
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with email and password
    const data = {
      email: email,
      password: password
    };

    try {
      // Make a POST request to the API endpoint using axios
      const response = await axios.post('https://localhost:7283/api/Match/login', data);
     
      console.log(response.data);
     if(response.data=='Login successful')
     {
      toast.success("Login Successfull", {
        position: "top-left" // Specify the position as top-left
      });
      // navigate("/notifications");
      setTimeout(() => {
        navigate("/notifications"); // Navigates to notifications screen after 3 seconds
      }, 2000);
     }
      
      // Handle the response data as needed
    } catch (error) {
      console.error(error);
      toast.error("Login UnSucessful", {
        position: "top-left" 
      });
    }
  };



  return (
    <>
          

    <div className="w-100">
    <ToastContainer/>
      <div className="containerChildDiv">
        <img className="Image1" src={houseimage} alt="img" />
        {/* <div className="btnDiv" >
          <button  type="button" className="btn buttonJoin"  onClick={check}>Join</button>
        </div> */}
        <div className="" style={{display:"flex"}}>
          
        <div className="btnDiv1">
          <button onClick={()=>navigate("/join")} type="button" className="btn buttonJoin">Join</button>
        </div>        <div className="btnDiv1">
          <button onClick={()=>navigate("/about")} type="button" className="btn buttonAbout">About</button>
        </div>
        </div>

        <div className="formDiv">

            <div className="form-group label">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="text"
                className="form-control input"
                // placeholder="email"
                // name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group label">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control input"
                // placeholder="password"
                // name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="exampleInputPassword1">Forgot password?</label>
            </div>
            <div className="signInDiv">
              <Link to="/notifications">
                <div className="btn-center">
                  <button type="submit" onClick={(e)=>handleSubmit(e)} className="btn buttonSIgnIn">
                    Sign in
                  </button>
                </div>
              </Link>
            </div>
          <div style={{ paddingTop: '50px' }}></div>
        </div>
      </div>
    </div>
    </>
  );

};

export default Home;
