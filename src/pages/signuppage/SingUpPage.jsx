import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput/TextInput";
import Button from "../../components/button/Button";
import PopupBox from "../../components/popup/PopupBox";

// importing css module
import Style from "./css/SignupPage.module.css";
import { UserContext } from "../../context/userContext/UserContextProvider";

// checking the pattern of name and email
const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SingUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientapp, setClientApp] = useState(null);
  const [isChecked, setIschecked] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("message"); //default the type of popup message is message if error update it to error

  // useNavigate hooks for navigating to another page
  const navigate = useNavigate();

  // userContext
  const { setUserid, setIsLogedIn } = useContext(UserContext);

  // function to get the client app name(browser name)
  const getBrowserName = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (!!document.documentMode === true) {
      setClientApp("Internet Explorer");
    } else if (userAgent.search("firefox") > -1) {
      setClientApp("Firefox");
    } else if (userAgent.search("chrome") > -1) {
      setClientApp("Chrome");
    } else if (userAgent.search("opr") > -1) {
      setClientApp("Opera");
    } else if (userAgent.search("safari") > -1) {
      setClientApp("Safari");
    } else {
      setClientApp("unknown");
    }
  };

  // this function check every field is fill or not
  //this function  check input value is valid value or not
  const checkField = () => {
    // initially setting the message type to error
    setMessageType("error");
    if (!firstname || firstname.length < 5 || !nameRegex.test(firstname)) {
      if (!firstname) {
        setMessage("Please fill the require field");
        return false;
      }
      if (firstname.length < 5) {
        setMessage("First name must contain at least 5 character");
        return false;
      }
      if (!nameRegex.test(firstname)) {
        setMessage("Number and special character are not allowed in naming");
        return false;
      }
    }

    if (!lastname || lastname.length < 2 || !nameRegex.test(lastname)) {
      if (!lastname) {
        setMessage("Please fill the require field");
        return false;
      }
      if (lastname.length < 2) {
        setMessage("Last name must contain at least 4 character");
        return false;
      }
      if (!nameRegex.test(lastname)) {
        setMessage("Number and special character are not allowed in naming");
        return false;
      }
    }

    if (!username || username.length < 5) {
      if (!username) {
        setMessage("Please fill the require field");
        return false;
      }
      if (username.length < 5) {
        setMessage("Please username most contail at least 5 character");
        return false;
      }
    }

    if (!email || email.length > 5) {
      if (!email) {
        setMessage("Please fill the require field");
        return false;
      }

      if (!emailRegex.test(email)) {
        setMessage("Invalid email");
        return false;
      }
    }

    if (!password || password.length < 8) {
      if (!password) {
        setMessage("Please fill the require field");
        return false;
      }
      if (password.length < 8) {
        setMessage("Password must contain at least 8 character");
        return false;
      }
    }
    if (!isChecked) {
      setMessage("Please mark the checkbox");
      return false;
    }

    // if every cases is passed it should return true
    return true;
  };

  // function to fetch the data to server
  const fetchData = async () => {
    try {
      // fetching data to server
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
          clientapp,
          isChecked,
        }),
      });

      // if res status is 409
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      } else {
        // res data
        const data = await res.json();
        setUserid(data.body.id);
        setIsLogedIn(true);
        setMessage(data.message);
        // waiting for few second
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (err) {
      setMessage(err.message);
      setMessageType("error");
    }
  };

  // function to submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // if checkField return
    if (checkField()) {
      fetchData();
    }
  };

  // useEffect hooks for getting client appname
  useEffect(() => {
    document.title = "Sign up";
    getBrowserName();
  }, []);
  return (
    <>
      {/* main container */}
      <div className={`${Style.container}`}>
        {/* popup message */}
        <div>
          {message && (
            <PopupBox
              setMessage={setMessage}
              type={messageType}
              message={message}
            />
          )}
        </div>

        {/* container for signup form */}
        <div className={`${Style.signupContainer}`}>
          {/* back btn */}
          <div>
            <NavLink to="/login" className={`${Style.backBtn}`}>
              Back
            </NavLink>
          </div>

          {/* create your account */}
          <div className={`${Style.headingBox}`}>
            <h1 className={`${Style.signup}`}>Sign up</h1>
            <h1>Create your account</h1>
          </div>

          {/* signup form */}
          <form className={`${Style.signupForm}`}>
            {/* firstname */}
            <TextInput
              title="First name"
              value={firstname}
              setInputValue={setFirstname}
              styleInput={`${Style.inputField}`}
            />

            {/* last name */}
            <TextInput
              title="Last name"
              value={lastname}
              setInputValue={setLastname}
              styleInput={`${Style.inputField}`}
            />

            {/* username */}
            <TextInput
              title="Username"
              value={username}
              setInputValue={setUsername}
              styleInput={`${Style.inputField}`}
            />

            {/* email */}
            <TextInput
              title="Email"
              value={email}
              setInputValue={setEmail}
              styleInput={`${Style.inputField}`}
            />

            {/* password */}
            <TextInput
              title="Password"
              type="password"
              value={password}
              setInputValue={setPassword}
              styleInput={`${Style.passwordField}`}
            />

            {/* check box */}
            <div className={`${Style.checkBox}`}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIschecked(e.target.checked)}
              />
              <p>
                I agree all the <span>terms and condition</span>
              </p>
            </div>

            {/* sign up btn */}
            <Button
              title="SINGUP"
              event={handleSubmit}
              styleBtn={`${Style.signupBtn}`}
            />
          </form>
        </div>
      </div>
    </>
  );
}
