import { Button } from '@mui/material';
import React, {useState } from 'react'
import './pcard.css'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from 'axios';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};
export default function Pcard({ email, contact, description, rlink, type, userId,callback1,Pic }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [work, setwork] = useState({
    description: description,
    phn: contact,
    email: email,
    rlink: rlink,
  });
    const [callback, setCallback] = callback1;

  const handleinput = (e) => {
    const { name, value } = e.target;
    setwork((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(work);
  };

  const handleSubmit = async () => {
    const postId = userId;
    console.log(userId);
    await axios
       .put("/update/post", 
         {
         
         description: work.description,
         phn: work.phn,
         email: work.email,
           rlink: work.rlink,
         postId
       })
      setCallback(!callback);
    handleClose();
  };
  const deletepost = async () => {
    const postId = userId;
    console.log(postId)
    const resp = await axios.delete(`/deletposts/${postId}`);
    console.log(resp)
    console.log(Pic)
    const res = await axios.delete(`/deletepic?Pic=${Pic}`);
    console.log(res)
    setCallback(!callback);
    alert("deleted")
    
  }
  

  return (
    <div className="container">
      <div className="cards grid-row">
        <div className="card">
          <div className="card-top">
            <img
              src={Pic}
              alt="Pic"
            />
          </div>
          <div className="card-info">
            <h2>Type:{type}</h2>
            <h2>Contact:{contact}</h2>
            <h2>Email:{email}</h2>
            {/* <span className="date">Monday, Jan 20, 2021</span> */}
            <p className="excerpt">{description}</p>
            <center>
              {" "}
              <a href={rlink} style={{textDecoration:"none"}}>
                <Button>Register</Button>
              </a>
            </center>
          </div>
          <div className="card-bottom flex-row">
            <a href="#" className="read-more" onClick={handleOpen}>
              Update post
            </a>
            <a href="#" className="button btn-sky" onClick={deletepost}>
              Delete
            </a>
          </div>
        </div>
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
            placeholder="Update Description"
            style={{
              margin: "5px",
              border: "1px solid black",
              height: "30%",
              width: "70%",
              resize: "none",
            }}
          />{" "}
          <hr />
          <label for="phone">Update phone number:</label>
          <input
            type="tel"
            id="phone"
            name="phn"
            value={work.phn}
            onChange={handleinput}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
          <hr />
          <label for="email">Update email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={work.email}
            onChange={handleinput}
          />
          <hr />
          <label for="link">Update Registration link </label>
          <input
            type="link"
            id="link"
            name="rlink"
            value={work.rlink}
            onChange={handleinput}
          />
          <hr />
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="outlined"
            className="postbuton"
            style={{ width: "70%", marginTop: "1.5rem" }}
          >
            <b>Update</b>
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
