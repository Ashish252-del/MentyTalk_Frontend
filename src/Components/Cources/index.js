import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "./Card";
import Footer from "../Footer";
import ResponsiveAppBar from "../Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:"80%",

  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};
export default function Connect() {
  const navigate = useNavigate();
  const checkUser = async () => {
    try {
      const resp = await axios.get("/check");
      if(resp.data.success) console.log("user is loged in")
    } catch (error) {
      console.log("Log in first")
   
      navigate('/Login')
    }
   
   
  };
  
  const [Image, Setimage] = useState({
    vst: false,
    upd: false,
  });
  const [Loading, Setloading] = useState(false);
  const [Link, SetLink] = useState(false);
  const [cource, setcource] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [work, setwork] = useState({
    description: "",
    phn: "",
    email: "",
    rlink: "",
    Pic:"https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    ctype: "Cource",
  });
  const handleinput = (e) => {
    const { name, value } = e.target;
   
    setwork((prev) => {
      // console.log(prev);
      return {
        
        ...prev,
        [name]: value,
      };
    });
  };
   const handleupload = async (e) => {
     try {
       const file = e.target.files[0];
      //  console.log(file);
   

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
      
       console.log(res.data.data.url);
       const url = res.data.data.url;
       setwork((prev) => {
         return {
           ...prev,
           Pic:url,
         };
       });
        Setimage((prev) => {
          return {
            ...prev,
            upd: true,
          };
        });
     } catch (error) {
       console.log(error);
     }
   };
  const handleSubmit = async() => {
   try {
     const resp = await axios.post('./posts',
     { description:work.description,
    phn:work.phn,
    email:work.email,
       rlink: work.rlink,
    Pic:work.Pic,
    ctype: work.ctype
       })
     console.log(resp);
     if (resp.data.success) alert("Post is made")
    Setloading(!Loading);

    handleClose();
    setwork({
      description: "",
      phn: "",
      email: "",
      rlink: "",
      Pic: "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
      ctype: "Workshop_Webinar",
    });
    Setimage({
      vst: false,
      upd: false,
    });
    SetLink(false);
   } catch (error) {
     console.log(error);
      alert("Please fill all fields")
     
   }
    
  };
  const fatchdata = async() => {
    const resp = await axios.get('/cources');
    //  console.log(resp);
    setcource(resp.data.data);
    // console.log(cource);
  }
  useEffect(() => {
     checkUser();
    fatchdata();
  }, [Loading]);
  return (
    <>
      <ResponsiveAppBar />
      <div
        className="mt-5 row"
        style={{ display: "flex", marginLeft: "5rem", gap: "1rem" }}
      >
        <div
          onClick={() => handleOpen()}
          className="inputbox col-sm-12  col-md-12  col-lg-6"
          style={{ width: "30rem" }}
        >
          <textarea
            disabled
            placeholder="Click to Post..."
            type="text"
            style={{
              resize: "none",
              width: "70%",
              height: "20vh",
              borderRadius: "1rem",
            }}
          />
        </div>
        <div className="col-sm-12  col-md-12  col-lg-6">
          <h2>Upload Course/Training Program</h2>
          <p>
           Cources/Training Program should be related to Engineering Domain
          </p>
        </div>
      </div>
      <div className="row p-5 g-5">
        {cource != null ? (
          cource.map((e, key) => {
            return (
              <div className="col-sm-12  col-md-6  col-lg-3">
                <Card
                  email={e.email}
                  description={e.description}
                  contact={e.phn}
                  rlink={e.rlink}
                  Pic={e.Pic}
                />
              </div>
            );
          })
        ) : (
          <h2>No data here</h2>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <textarea
            name="description"
            value={work.description}
            onChange={handleinput}
            type="text"
            placeholder="Write a post about the kind of conneection you are looking for"
            style={{
              margin: "5px",
              border: "1px solid black",
              height: "30%",
              width: "70%",
              resize: "none",
            }}
          />{" "}
          <hr />
          <label for="phone">Enter your phone number:</label>
          <input
            type="tel"
            id="phone"
            name="phn"
            value={work.phn}
            onChange={handleinput}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
          <hr />
          <label for="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={work.email}
            onChange={handleinput}
          />
          <hr />
          <p>
            Have you Registration Link <br />
            <input
              type="radio"
              id="html"
              name="Registration Link"
              value={true}
              onClick={() => {
                SetLink(true);
              }}
            />
              <label for="html">Yes</label>
            <br />
            <input
              type="radio"
              id="css"
              name="Registration Link"
              value={false}
              onClick={() => {
                SetLink(false);
              }}
            />
            <label for="css">&nbsp;No</label>
            <br></br>
          </p>
          {Link === true ? (
            <>
              <label for="link">Put Registration link </label>
              <input
                type="link"
                id="link"
                name="rlink"
                value={work.rlink}
                onChange={handleinput}
              />
              <hr />
            </>
          ) : null}
          <tr>
            <h3>Upload image related to workshop</h3>{" "}
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
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
            {Image.vst ? Image.upd ? <span>Uploaded</span> : <Loader /> : null}
          </tr>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="outlined"
            className="postbuton"
            style={{ width: "70%", marginTop: "1.5rem" }}
          >
            <b>POST</b>
          </Button>
        </Box>
      </Modal>
      <Footer />
    </>
  );
}
