import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput/TextInput";
import Button from "../../components/button/Button";
import PopupBox from "../../components/popup/PopupBox";

// importing css module
import Style from "./css/LoginPage.module.css";
import { UserContext } from "../../context/userContext/UserContextProvider";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("message"); //default the type of message is message if res send the error then you need to update it towards to error


//context
const {setUserid} = useContext(UserContext);

  // useNavigate for navigating to home page
  const navigate = useNavigate();


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
  };

  //  fetching email and password to server
  const fetchData = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      } else {
        const data = await res.json();
        setMessage(data.message);
        setUserid(data.id);
        setMessageType("message");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (err) {
      setMessageType("error");
      setMessage(err.message);
    }
  };

  // event to handle the submit
  const handleSubmit = (e) => {
    if (checkFiled()) {
      fetchData();
    }
    e.preventDefault();
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <div>
        {/* container of login page */}
        <div className={`${Style.container}`}>
          {/* popup message */}
          {message && (
            <PopupBox
              type={messageType}
              message={message}
              setMessage={setMessage}
            />
          )}

          {/* for titile and heading of login page */}
          <div className={`${Style.headingBox}`}>
            <p className={`${Style.headingTitle}`}>Hi</p>
            <p className={`${Style.headingTitle}`}>Welcome Back</p>
          </div>

          {/* login form */}
          <form className={`${Style.loginForm}`}>
            <p className={`${Style.subtitle}`}>
              Login with your email and password
            </p>

            {/* for email */}
            <TextInput
              title="Email"
              value={userEmail}
              setInputValue={setUserEmail}
              styleInput={`${Style.inputField}`}
              placeholder="abc@gmail.com"
            />

            {/* for pasword */}
            <TextInput
              type="password"
              title="Password"
              value={userPassword}
              setInputValue={setUserPassword}
              styleInput={`${Style.passwordField}`}
              placeholder="password"
            />

            {/* div for forget password and login btn */}
            <div className={`${Style.forgetPassword}`}>
              <NavLink className={`${Style.forgetPassword}`}>Forget Password</NavLink>
            </div>

            {/* btn */}
            <Button
              title="LOGIN"
              event={handleSubmit}
              styleBtn={`${Style.loginBtn}`}
            />

            {/* or */}
            <div
              className={`${Style.orDiv}`}
            >
              <span className={`${Style.spanBar}`}></span>
              <span>Or</span>
              <span className={`${Style.spanBar}`}></span>
            </div>

            {/* sing up */}
            <div
              className={`${Style.signupSection}`}
            >
              <span className={`${Style.haveAccount}`}>Do not have account ?</span>
              <NavLink
                to="/signup"
                replace={true}
                className={`${Style.singupNavlink}`}
              >
                SignUp
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
