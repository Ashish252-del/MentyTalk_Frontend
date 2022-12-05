import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ email, contact, description, rlink,Pic }) {
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        // height="140"
        image={Pic}
        alt="Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {description}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          Contact:{contact}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          Email:{email}
        </Typography>
      </CardContent>
      <CardActions>
        <a
          href={rlink}
          style={{ textDecoration: "none" }}
        >
          <Button size="small">Register</Button>
        </a>
      </CardActions>
    </Card>
  );
}
