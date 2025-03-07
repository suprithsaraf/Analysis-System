import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3050/api/:id/alldetails")
      .then((response) => setDesigns(response.data))
      .catch((error) => console.error("Error fetching designs:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Building Designs
      </Typography>
      <Button variant="contained" onClick={() => navigate("/create-design")}>
        Add New Design
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designs.map((design) => (
              <TableRow key={design._id}>
                <TableCell>{design.name}</TableCell>
                <TableCell>{design.city}</TableCell>
                <TableCell>
                  {new Date(design.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
