import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "axios";

const CityRankings = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(async () => {
    const data = await axios
      .get('http://localhost:3050/api/analysis/cities"')
      .then((response) => setRankings(response.data))
      .catch((error) => console.error("Error fetching rankings:", error));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">City Energy Efficiency Rankings</Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>Efficiency Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankings.map((city, index) => (
              <TableRow key={index}>
                <TableCell>{city.city}</TableCell>
                <TableCell>{city.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CityRankings;
