import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './Post.css'

import Card from "./Card";
const Post = (Loading) => {
   const [webinar, setwebinar] = useState([]);
  
  const fatchdata = async () => {
    const resp = await axios.get("/webinar");
    // console.log(resp);
    setwebinar(resp.data.data);
    // console.log(webinar);
  };
  useEffect(() => {
    fatchdata();
  }, [Loading]);

    return (
      <>
        <div className="container">
         
          {(webinar.length!=null) ?
          ( webinar.map((e, key) => {
            return (
             
                <Card
                  email={e.email}
                  description={e.description}
                  contact={e.phn}
                rlink={e.rlink}
                Pic={e.Pic}
                />
             
            );
          })):<h1>No data here</h1>}
         


        </div>
      </>
    );
}

export default Post;