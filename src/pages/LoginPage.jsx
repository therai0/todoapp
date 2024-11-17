import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import TextInput from '../components/textInput/TextInput';
import Button from '../components/button/Button';
import PopupBox from '../components/popup/PopupBox';


export default function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [screenWidth, setScreenWidth] = useState(0);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("message") //default the type of message is message if res send the error then you need to update it towards to error


  // useNavigate for navigating to home page
  const navigate = useNavigate()

  // check every field is filled or not
  const checkFiled = () => {

    // initially setting the type of message is error
    setMessageType("error");

    if (!userEmail || !userPassword) {
      setMessage("Plesae enter the require field");
      return false;
    }

    // if every cases is pass then it should return true
    return true;

  }

  //  fetching email and password to server
  const fetchData = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userEmail, password: userPassword })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      else {
        const data = await res.json();
        setMessage(data.message);
        setMessageType("message");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    }
    catch (err) {
      setMessageType("error");
      setMessage(err.message);
    }
  }

  // event to handle the submit
  const handleSubmit = (e) => {
    if (checkFiled()) {
      fetchData();
    }
    e.preventDefault();
  }

  useEffect(() => {
    document.title = "Login"
  }, []);

  return (
    <>
      <div>
        {/* container of login page */}
        <div className={`h-[100vh] w-[100%] bg-[#F3F8FF] p-[15px] font-sans`}>

          {/* popup message */}
          {message && <PopupBox type={messageType} message={message} setMessage={setMessage} />}

          {/* for titile and heading of login page */}
          <div className={`h-[30%] w-[100%] flex flex-col justify-end `}>
            <p className={`text-[32px] font-bold opacity-[75%]`}>Hi</p>
            <p className='text-[32px] font-bold opacity-[75%]'>Welcome Back</p>
          </div>


          {/* login form */}
          <form className=' h-[70%] w-[100%] py-[20px] flex flex-col gap-[20px]'>
            <p className='text-[16px] opacity-[60%] py-[10px]'>Login with your email and password</p>

            {/* for email */}
            <TextInput
              title="Email"
              value={userEmail}
              setInputValue={setUserEmail}
              styleInput={`h-[50px] w-[100%] rounded-[5px] border border-[1px] border-gray-300 px-[5px] focus:outline-none`}
              placeholder='abc@gmail.com'
            />

            {/* for pasword */}
            <TextInput
              type="password"
              title="Password"
              value={userPassword}
              setInputValue={setUserPassword}
              styleInput={`flex items-center h-[50px] border-[1px] border-gray-300 p-[1px] rounded-[5px]`}
              placeholder='password'
            />

            {/* div for forget password and login btn */}
            <div className={`text-end opacity-[75%]`}>
              <NavLink >Forget Password</NavLink>
            </div>

            {/* btn */}
            <Button
              title="LOGIN"
              event={handleSubmit}
              styleBtn={`w-[100%] h-[50px] bg-[#9694FF] rounded-[5px] text-[white]`}
            />


            {/* or */}
            <div className={`h-[50px] flex justify-center items-center gap-[5px]`}>
              <span className={`h-[1px] bg-[#80808085] w-[30%]`}></span>
              <span>Or</span>
              <span className={`h-[1px] bg-[#80808085] w-[30%]`}></span>
            </div>

            {/* sing up */}
            <div className={`h-[50px] flex justify-center items-center gap-[5px]`}>
              <span className={`opacity-[75%]`}>Do not have account ?</span>
              <NavLink to="/signup" replace={true} className={`font-bold opacity-[75%]`}>SignUp</NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
