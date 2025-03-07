import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DesignForm = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const design = { name, city };
    try {
      await axios.post("http://localhost:3050/api/:id/alldetails", design);
      alert("Design added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding design:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Add New Design
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Building Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
          required
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default DesignForm;
