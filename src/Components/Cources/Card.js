import React from 'react'

export default function Card({email,contact,description,rlink,Pic}) {
 
  return (
   
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          
          src={Pic}
          className="card-img-top"
          alt="Pic"
        />
        <div className="card-body">
          <h6 className="card-title">Email:{email}</h6>
          <h6 className="card-title">Contact:{contact}</h6>
          <p className="card-text">
           {description}
          </p>
          <a href={rlink} className="btn btn-primary">
            Enroll now
          </a>
        </div>
      </div>
    </>
  );
}
