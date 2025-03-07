import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";

const HeatAnalysis = () => {
  const [dimensions, setDimensions] = useState({ height: "", width: "" });
  const [WWR, setWWR] = useState("");
  const [SHGC, setSHGC] = useState("");
  const [city, setCity] = useState("");
  const [heatGain, setHeatGain] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setHeatGain(null);

    if (!dimensions.height || !dimensions.width || !WWR || !SHGC || !city) {
      setError("All fields are required.");
      return;
    }

    try {
      const data = { dimensions, WWR, SHGC, city };
      const result = await axios.post(
        "http://localhost:3050/api/analysis/calculate",
        data
      );
      setHeatGain(result.data);
    } catch (err) {
      setError("Error calculating heat gain. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Heat Gain Analysis
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Height (ft)"
          type="number"
          value={dimensions.height}
          onChange={(e) =>
            setDimensions({ ...dimensions, height: e.target.value })
          }
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Width (ft)"
          type="number"
          value={dimensions.width}
          onChange={(e) =>
            setDimensions({ ...dimensions, width: e.target.value })
          }
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Window-to-Wall Ratio (WWR)"
          type="number"
          value={WWR}
          onChange={(e) => setWWR(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Solar Heat Gain Coefficient (SHGC)"
          type="number"
          value={SHGC}
          onChange={(e) => setSHGC(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select City
          </MenuItem>
          <MenuItem value="Bangalore">Bangalore</MenuItem>
          <MenuItem value="Mumbai">Mumbai</MenuItem>
          <MenuItem value="Kolkata">Kolkata</MenuItem>
          <MenuItem value="Delhi">Delhi</MenuItem>
        </Select>

        {error && <Typography color="error">{error}</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          Calculate Heat Gain
        </Button>
      </form>

      {heatGain !== null && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Estimated Heat Gain: {heatGain} BTU
        </Typography>
      )}
    </Container>
  );
};

export default HeatAnalysis;
