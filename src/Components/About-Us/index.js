import React from 'react'
import Footer from '../Footer'
import ResponsiveAppBar from '../Navbar'
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import './About.css'
import axios from 'axios'
import Ashish from '../../Images/Ashish.jpg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AboutUs() {
     const navigate = useNavigate();
     const checkUser = async () => {
       try {
         const resp = await axios.get("/check");
         if (resp.data.success) console.log("user is loged in");
       } catch (error) {
         console.log("Log in first");

         navigate("/Login");
       }
     };
     useEffect(() => {
       checkUser();
     }, []);
    return (
      <>
        <ResponsiveAppBar />
        <div className="parent">
          <center>
            <h1 style={{ color: "Red" }}>Know About me....</h1>
          </center>
          <div className="About row ">
            <div className="l col-sm-12 col-md-12 col-lg-4">
              <img
                src={Ashish}
                alt="My Pic"
                style={{ height: "250px", width: "250px", borderRadius: "50%" }}
              />

              <div className="row logo ">
                <div className="col-2">
                  {" "}
                  <a href="https://github.com/Ashish252-del">
                    <GitHubIcon
                      sx={{ fontSize: 50, color: "Black" }}
                      color="action"
                    />
                  </a>
                </div>
                <div className="col-2">
                  {" "}
                  <a href="www.linkedin.com/in/ashish-patel-3464b7203">
                    <LinkedInIcon sx={{ fontSize: 50 }} />
                  </a>{" "}
                </div>
                <div className="col-2">
                  {" "}
                  <a href="https://www.instagram.com/a_s_h_i_s_h_patel_02/">
                    <InstagramIcon
                      color="success"
                      sx={{ fontSize: 50, color: "Red" }}
                    />
                  </a>{" "}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-8 r">
              <h1 style={{ color: "rgb(24,83,137)" }}>
                Hey This is Ashish Patel{" "}
              </h1>
              <hr />
              <h5>
                I am an Engineering student , Pursuing my Btech from MMMUT
                Gorakhpur Uttar Pradesh.
                <br />
                I am in 3rd year and my branch in Electronics and Communication
                Engineering.
                <br />
                I am a MERN stack web developer with two years of experience in
                frontend and Backend of websites. Recognized for leadership and
                collaborative abilities when working in team settings.
                <br />
              </h5>
              <br />
              <a
                href="https://ashish252-del.github.io/portfolio/"
                
              >
              Portfolio
              </a>
              <hr />
              <EmailIcon sx={{ fontSize: 50 }} />{" "}
              <span>ashishpatel3946@gmail.com</span>
            </div>
          </div>
          <br />
          <Footer />
        </div>
      </>
    );
}
