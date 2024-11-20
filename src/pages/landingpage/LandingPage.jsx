import React, { useContext, useEffect } from "react";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

// importing css module
import Style from "./css/LandingPage.module.css";
import { UserContext } from "../../context/userContext/UserContextProvider";

export default function LandingPage() {
  //  function that helps to navigate to signup page
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("signup");
  };

  // context
  const { islogedIn } = useContext(UserContext);

  useEffect(() => {

    if (islogedIn) {
      console.log("Is this code is not running");
      navigate("home");
    }
    
    document.title = "Welcome";
  }, [islogedIn]);
  return (
    <>
      {/* main container of landing page */}
      <div className={`${Style.container}`}>
        {/* navbar for landing page */}
        <nav className={`${Style.navbar}`}>
          {/* logo */}
          <div className={`${Style.logoDiv}`}>
            <img src={logo} className={`h-[24px] w-[40px]`} />
          </div>

          {/* login btn  */}
          <div className={`${Style.loginBtn}`}>
            <NavLink className={`${Style.navlink}`} to="/login">
              Login
            </NavLink>
          </div>
        </nav>

        {/* hero section */}
        <div className={`${Style.herosection}`}>
          <h1 className={`${Style.heading}`}>
            Plan Your Day, Achieve Your Goals.
          </h1>
          <p className={`${Style.subheading}`}>
            Your ultimate tool to streamline tasks, stay focused, and accomplish
            goals effortlessly
          </p>

          {/* get started button */}
          <Button
            event={handleNavigation}
            title="Get started"
            styleBtn={`${Style.getstartedbtn}`}
          />
        </div>
      </div>
    </>
  );
}
