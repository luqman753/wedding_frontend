import {useState,React} from 'react'
import axios from 'axios'
import "../styles/join.css"
import logo from '../assests/logo.jpg'
import Input from '../components/Input'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const Join = () => {
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  // Step 3: Create a function to handle form submission
  const handleFormSubmit =async () => {
    const formData = {
       
        "user_name": firstName,
        "user_lastName": lastName,      
        "user_gender": gender,
        "user_phone": lastName,
        "daily_func_score": 0,
        "readliness_relationship_score": 0,
        "reason_for_rejection": "string",
        "email": email,
        "password": password
      }
      console.log(formData);
      const response = await axios.post('https://localhost:7283/api/User/AddUser', formData);
     
      console.log(response.data);
      if(response.data=='User Added Successfully')
      {
       toast.success("User Created", {
         position: "top-left" // Specify the position as top-left
       });
       setTimeout(() => {
        navigate("/"); // Navigates to notifications screen after 3 seconds
      }, 2000);
    }
}
    

    // Step 4: Send the formData object to the API using fetch or axios
  

    return (
        <div className='joinContainer'>
            <img src={logo} style={{ position: 'absolute', left: 0, top: 0 }} alt="sdfdsf" />
            <ToastContainer/>
            <div className='formContainer'>
                <div style={{marginLeft:"1.6rem"}}>
                    <h3 style={{fontSize:"4rem"}}>Join</h3>
                    <p>Hello Great</p>
                </div>
                <div className='formBox' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 >First Name</h2>
            <input style={{ height: '30px' , width:"200px"}} label="First Name" type="text" onChange={(e) => setFirstName(e.target.value)} />
            <h2 >Last Name</h2>
          <input  style={{ height: '30px' }}label="Last Name" type="text" onChange={(e) => setLastName(e.target.value)} />
          <h2 >Gender</h2>
          <input style={{ height: '30px' }}label="gender" type="text" onChange={(e) => setGender(e.target.value)} />
          <h2 >Email</h2>
          <input style={{ height: '30px' }} label="Email:"  
                name="email"type="text" value={email}
                onChange={(e) => setEmail(e.target.value)} />
          {/* <input
                type="text"
                className="form-control input"
                
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> */}
              <h2 >Password</h2>
          <input style={{ height: '30px' }}  label="Password:" type="password" onChange={(e) => setPassword(e.target.value)} />
        
                </div>
                <div style={{ display: 'flex', height: "84vh", alignItems: 'flex-end' }}>
                <button className='mybutton' onClick={handleFormSubmit}>Confirm</button>

                </div>
            </div>
        </div>
    )
}

export default Join




