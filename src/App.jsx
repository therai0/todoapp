
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import LandingPage from "./pages/landingpage/LandingPage";
import LoginPage from "./pages/loginpage/LoginPage";
import SignUpPage from "./pages/signuppage/SingUpPage";
import HomePage from "./pages/homepage/Homepage";
import UserContextProvider from "./context/userContext/UserContextProvider";

function App() {


  return (
    <>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path="*" element={<p>404 not found</p>}/>
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </>
  )
}

export default App
