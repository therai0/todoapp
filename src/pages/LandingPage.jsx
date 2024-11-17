import React from 'react'
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';


export default function LandingPage() {

//  function that helps to navigate to signup page
const navigate = useNavigate();

const handleNavigation = ()=> {
  navigate("signup");
}
  
  return (
    <>
      {/* main container of landing page */}

      <div className='h-[auto] bg-[#F3F8FF] w-[100%] p-[15px]'>

        {/* navbar for landing page */}
        <nav className={`h-[50px] w-[100%] flex`}>

          {/* logo */}
          <div className='flex items-center w-[50%]'>
            <img src={logo} className={`h-[24px] w-[40px]`} />
          </div>

          {/* login btn  */}
          <div className='flex items-center justify-end w-[50%]'>
            <NavLink className={`text-[#9694FF]`} to="/login">Login</NavLink>
          </div>
        </nav>


        {/* hero section */}
        <div className={`h-[100vh] w-[100%] flex flex-col justify-center items-center gap-[20px]`}>

          <h1 className={`font-bold text-[32px] text-center opacity-[75%]`}>Plan Your Day, Achieve Your Goals.</h1>
          <p className={`text-[14px] opacity-[50%] text-center`}>Your ultimate tool to streamline tasks, stay focused, and accomplish goals effortlessly
          </p>

          {/* get started button */}
          <Button event={handleNavigation} title="Get started"
          styleBtn={`h-[45px] w-[300px] rounded-[5px] bg-[#9694FF] text-[white]`}
          />
        </div>
      </div>
    </>
  )
}


