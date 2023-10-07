import { React, useState } from 'react'
import axios from "axios";
import './login.css'
import { useNavigate } from "react-router-dom";

import Loader from "../Loader/Loader";
export default function Login() {
  const nevigate = useNavigate();
   
  const [Image, Setimage] = useState({
    vst: false,
    upd: false,
  });
  
    const [user, setuser] = useState({
        email: "",
        password:"",
    })
    const [reg, setreg] = useState({
      name: "",
      password: "",
      reppassword: "",
      profilepic:"https://png.pngitem.com/pimgs/s/64-646593_thamali-k-i-s-user-default-image-jpg.png",
      email: "",
      type: "",
    });
  const [ch, setCh] = useState(true);
    const handleloginput =(e) => {
      // console.log(e.target.name);
      //   console.log(e.target.value);
        const { name, value } = e.target;
         setuser((prev) => {
          //  console.log(prev); 
           return {
             ...prev,
             [name]: value,
           };
         });
 }
  const handlesigninput = (e) => {
    const { name, value } = e.target;
    setreg((prev) => {
      console.log(prev);
      return {
        ...prev,
        [name] : value,
      }
    }
    )
  }
   const handleupload = async (e) => {
     try {
       const file = e.target.files[0];
       console.log(file);
      

       if (file === null) return alert("file does not exist");
       if (file.size > 1024 * 1024) return alert("file too large");
       if (file.type !== "image/jpeg" && file.type !== "image/png")
         return "invalid file";
       let formData = new FormData();
       formData.append("file", file);
      
       const res = await axios.post("/upload", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });
      
      //  console.log(res.data.data.url);
       const url = res.data.data.url;
       setreg((prev) => {
         return {
           ...prev,
          profilepic:url,
         };
       });
       Setimage((prev) => {
         return {
           ...prev,
           upd:true,
         };
       });
     } catch (error) {
       console.log(error);
     }
   };
  const onSignin = async(e) => {
    try {
      
     e.preventDefault();
      const resp = await axios.post("/login",
        { email: user.email, password: user.password });
     
      if (resp.data.success === true) alert("Loged in successfully")
      setuser({
        email: "",
        password:""
      })
      nevigate("/Workshop_Webinar");
    } catch (error) {
      if (error.response.status === 402) alert("Plz fill all the fields")
      else alert("Invalid email or password")
      console.log(error);
      setuser({
        email: "",
        password: "",
      });
    }
  }
  const onSignup = async(e)=> {
    try {
      e.preventDefault();
      if(reg.password!==reg.reppassword) return alert("Password does not match")
      const resp = await axios.post("/user", {
        name:reg.name,
        password:reg.password,
        email: reg.email,
        profilepic: reg.profilepic,
        type:reg.type,
      });
      if (resp.data.success) alert("Account created")
      setreg({
        name: "",
        password: "",
        reppassword: "",
        email: "",
        type: "",
      });
      setCh(!ch);
    } catch (error) {
      alert("Fill all fields ")
    }
  }
  return (
    <div className="login-wrap">
      <div className="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked={ch}
          onChange={() => setCh(!ch)}
        />
        <label for="tab-1" className="tab">
          Sign In
        </label>
        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          checked={!ch}
          onChange={() => setCh(!ch)}
        />
        <label for="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label for="user" className="label">
                Email
              </label>
              <input
                id="user"
                type="text"
                value={user.email}
                name="email"
                onChange={handleloginput}
                className="input"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                name="password"
                value={user.password}
                onChange={handleloginput}
                data-type="password"
              />
            </div>
            <div className="group">
              <input id="check" type="checkbox" className="check" checked />
              <label for="check">
                {/* <span className="icon"></span> Keep me Signed in */}
              </label>
            </div>
            <div className="group">
              <input
                type="submit"
                className="button"
                value="Sign In"
                onClick={onSignin}
              />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              {/* <a href="#forgot">Forgot Password?</a> */}
            </div>
          </div>
          <div className="sign-up-htm">
            <div className="group">
              <label for="user" className="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="input"
                name="name"
                value={reg.name}
                onChange={handlesigninput}
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                name="password"
                value={reg.password}
                onChange={handlesigninput}
                data-type="password"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
               Confirm Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                name="reppassword"
                value={reg.reppassword}
                onChange={handlesigninput}
                data-type="password"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Email Address
              </label>
              <input
                id="pass"
                type="text"
                className="input"
                name="email"
                value={reg.email}
                onChange={handlesigninput}
              />
            </div>
            <div className="group custom-select ">
              <select
                id="cars"
                className="select-selected"
                aria-label="Default select example"
                name="type"
                value={reg.type}
                onChange={handlesigninput}
              >
                <option value="" className="select-items">
                  Select Type
                </option>
                <option value="Teacher" className="select-items">
                  Company/Organisation
                </option>
                <option value="Student" className="select-items">
                  Student
                </option>
              </select>
            </div>
            <div>
              <span style={{ color: "white" }}>Upload Profile Pic</span>
              <tr>
                <input
                  style={{ color: "white", margin: "2px" }}
                  type="file"
                  name="file"
                  onChange={(e) => {
                    handleupload(e);
                    Setimage((prev) => {
                      return {
                        ...prev,
                        vst: true,
                      };
                    });
                  }}
                />
                {Image.vst ? (
                  Image.upd ? (
                    <span>Uploaded</span>
                  ) : (
                    <Loader />
                  )
                ) : null}
              </tr>
            </div>
            <div className="group">
              <input
                type="submit"
                className="button"
                value="Sign Up"
                onClick={onSignup}
              />
            </div>
            <div className="hr"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
