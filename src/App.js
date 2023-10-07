
import './App.css';

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Workshop_Webinar";
import Connect from "./Components/Cources";
import Blog from './Components/Itern_Placement';

import AboutUs from './Components/About-Us';
import Login from './Components/Login-Signup';
import Profile from './Components/Profile/Profile';
function App() {
  const location = useLocation();
  return (
    <>
     
      {location.pathname === "/" ? <Login /> : null}
      <Routes>
        <Route path="/Workshop_Webinar" element={<Home />} />
        <Route path="/Courses" element={<Connect />} />
        <Route path="/Intern_Placement" element={<Blog />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
