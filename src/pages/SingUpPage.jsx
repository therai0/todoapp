import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import TextInput from '../components/textInput/TextInput';
import Button from '../components/button/Button';
import PopupBox from '../components/popup/PopupBox';


// checking the pattern of name and email
const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



export default function SingUpPage() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientapp, setClientApp] = useState(null);
  const [isChecked, setIschecked] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("message"); //default the type of popup message is message if error update it to error


  // useNavigate hooks for navigating to another page
  const navigate = useNavigate();

  // function to get the client app name(browser name)
  const getBrowserName = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (!!document.documentMode === true) {
      setClientApp("Internet Explorer");

    } else if (userAgent.search("firefox") > -1) {
      setClientApp("Firefox");

    }
    else if (userAgent.search("chrome") > -1) {
      setClientApp("Chrome");

    }
    else if (userAgent.search("opr") > -1) {
      setClientApp("Opera");

    }
    else if (userAgent.search("safari") > -1) {
      setClientApp("Safari");
    }
    else {
      setClientApp("unknown");
    }
  }


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
        return false;;
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
        setMessage("Password must contain at least 8 character")
        return false;
      }
    }
    if (!isChecked) {
      setMessage("Please mark the checkbox");
      return false;
    }

    // if every cases is passed it should return true
    return true;
  }


  // function to fetch the data to server 
  const fetchData = async () => {
    try {

      // fetching data to server
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
          clientapp,
          isChecked
        })
      });

      // if res status is 409
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      else {
        // res data
        const data = await res.json();
        console.log(`Response data:${data}`);
        setMessage(data.message);

        // waiting for few second 
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }



    } catch (err) {
      setMessage(err.message);
      setMessageType("error");
    }
  }

  // function to submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // if checkField return 
    if (checkField()) {
      fetchData();
    }
  }

  // useEffect hooks for getting client appname
  useEffect(() => {
    document.title = "Sign up"
    getBrowserName();
  }, []);
  return (
    <>
      {/* main container */}
      <div>

        {/* popup message */}
        {message && <PopupBox setMessage={setMessage} type={messageType} message={message} />
        }

        {/* container for signup form */}
        <div className={`p-[15px] h-[100vh] w-[100%] bg-[#F3F8FF]`}>

          {/* back btn */}
          <div >
            <NavLink to="/login" className={`opacity-[75%]`}>Back</NavLink>
          </div>


          {/* create your account */}
          <div className={`h-[200px]  flex flex-col items-center justify-center gap-[10px]`}>
            <h1 className={`font-bold text-[32px] opacity-[75%]`}>Sign up</h1>
            <h1 className={` opacity-[75%]`}>Create your account</h1>
          </div>


          {/* signup form */}
          <form className={`flex flex-col gap-[20px]`}>


            {/* firstname */}
            <TextInput
              title="First name"
              value={firstname}
              setInputValue={setFirstname}
              styleInput={`h-[45px] w-[100%] border-[1px] border-gray-300 rounded-[5px] focuse:outline-none px-[5px]`}
            />

            {/* last name */}
            <TextInput
              title="Last name"
              value={lastname}
              setInputValue={setLastname}
              styleInput={`h-[45px] w-[100%] border-[1px] border-gray-300 rounded-[5px] focuse:outline-none px-[5px]`}
            />

            {/* username */}
            <TextInput
              title="Username"
              value={username}
              setInputValue={setUsername}
              styleInput={`h-[45px] w-[100%] border-[1px] border-gray-300 rounded-[5px] focuse:outline-none px-[5px]`}
            />

            {/* email */}
            <TextInput
              title="Email"
              value={email}
              setInputValue={setEmail}
              styleInput={`h-[45px] w-[100%] border-[1px] border-gray-300 rounded-[5px] focuse:outline-none px-[5px]`}
            />

            {/* password */}
            <TextInput
              title="Password"
              type="password"
              value={password}
              setInputValue={setPassword}
              styleInput={` flex items-center h-[50px] w-[100%] border-[1px] border-gray-300 rounded-[5px] focuse:outline-none px-[5px]`}
            />

            {/* check box */}
            <div className='flex gap-[5px]'>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIschecked(e.target.checked)}
              />
              <p className={`opacity-[75%]`}>I agree all the <span>terms and condition</span></p>
            </div>


            {/* sign up btn */}
            <Button
              title="SINGUP"
              event={handleSubmit}
              styleBtn={`h-[45px] w-[100%] rounded-[5px] bg-[#9694FF] text-[white]`}
            />
          </form>
        </div>
      </div>
    </>
  )
}
