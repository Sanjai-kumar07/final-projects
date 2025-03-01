import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const LoginPopup = ({setShowLogin}) => {

 
  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up")
  const [data,setData] = useState({
    name:"",
    email:"",
    contactno:"",
    password:""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin =async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState==="Login") {
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
      
    }
    try {
      const response = await axios.post(newUrl, data);
  
      if (response.data.success) {
        if (currState === "Login") {
          // Login successful
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
          alert("Login Successfully");
        } else {
          // Registration successful → Switch to login mode
          alert("Registered Successfully. Please log in.");
          setCurrState("Login"); // Redirect to login form
          setData({ name: "", email: "", contactno: "", password: "" }); // Clear input fields
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  }
  
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='pic1'/>
        </div>
        <div className='login-popup-inputs'>
          {currState==="Login"?<></>:
            <div className='login-popup-input-signin'>
              <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='User name' required/>
              <input name='contactno' onChange={onChangeHandler} value={data.contactno} type='number' placeholder='Your mobileno' required/>
            </div>}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required/>
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required/>
          
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required/>
            <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"?
        <p>Create a new account ? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have a account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup