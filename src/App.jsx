
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SingUpPage";
import HomePage from "./pages/Homepage";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path="*" element={<p>404 not found</p>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
