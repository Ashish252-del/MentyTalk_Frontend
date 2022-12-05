import React,{useState,useEffect} from 'react'
import ResponsiveAppBar from '../Navbar';
import Pcard from './Pcard';
import Button from "@mui/material/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
   const navigate = useNavigate();
    const [callback, setCallback] = useState(true);

   const checkUser = async () => {
     try {
       const resp = await axios.get("/check");
       if (resp.data.success) console.log("user is loged in");
     } catch (error) {
       console.log("Log in first");
    navigate("/Login");
     }
   };
 
  
    const [details, setdetails] = useState([]);
    const [User, setUser] = useState([]);
    const fatchdata = async () => {
      const resp = await axios.get("/profilepost");
      // console.log(resp);
      setdetails(resp.data.data);
      // console.log(details);
    };
    const fatchuserdata = async () => {
      const resp = await axios.get("/profile");
      // console.log(resp);
      setUser(resp.data.data);
      // console.log(User);
    };
    
  useEffect(() => {
      checkUser();
    fatchuserdata();
     fatchdata();
    }, [callback]);
  return (
    <>
      <ResponsiveAppBar />
      <div className="row">
        <div className="col-sm-12  col-md-6  col-lg-6">
          <div>
            <img style={{height:"350px", width:"350px", borderRadius:"100%"}} src={User.profilepic} alt="Image"/>
          </div>
        </div>
        <div className="col-sm-12  col-md-6  col-lg-6">
          <div className="p-5">
            <h2 style={{ color: "gray" }}>Name: {User.name}</h2>
            <br />
            <h2 style={{ color: "gray" }}>Email: {User.email}</h2>
            <br />
            <h2 style={{ color: "gray" }}>Type: {User.type}</h2>
          </div>
        </div>
      </div>
      <hr />
      <center>
        <h1>Your Posts</h1>
      </center>
      <div className="row p-5 g-5">
        {details != null ? (
          details.map((e, key) => {
            return (
              <div className="col-sm-12  col-md-6  col-lg-3">
                <Pcard
                  email={e.email}
                  description={e.description}
                  contact={e.phn}
                  rlink={e.rlink}
                  type={e.ctype}
                  Pic={e.Pic}
                  userId={e._id}
                  callback1={[callback, setCallback]}
                />
              </div>
            );
          })
        ) : (
          <h2>No data here</h2>
        )}
      </div>
    </>
  );
}
