import React from 'react'
import Button from "@mui/material/Button";
import './Post.css'
export default function Card({ email, contact, description, rlink, Pic }) {
  return (
    <div className="card mb-3" style={{ maxWidth:"540px"}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={Pic} className="card-img" alt="Image"/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
            <h5 className="card-title">Email: {email }</h5>
            <h5 className="card-title">Contact: {contact }</h5>
            <p className="card-text">{description }</p>
        <a href={rlink} style={{textDecoration:"none"}}><Button>Register</Button></a>
      </div>
    </div>
  </div>
</div>
  );
}
