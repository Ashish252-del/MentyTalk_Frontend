import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function Footer() {
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
          <footer className="bg-light text-center text-lg-start">
 
  <div className="text-center p-3" style={{backgroundColor: "#1976d2 ",color:"whitesmoke"}}>
    DesignBy:Ashish Patel © 2022 Copyright:
    <a className="text-dark" href="#"  style={{textDecoration:"none",color:"whitesmoke"}}> Menty-talk.com</a>
  </div>
 
</footer>
      </>
  )
}
