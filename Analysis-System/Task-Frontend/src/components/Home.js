import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3">Building Energy Analysis</Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default Home;
