const analysisController = {};

analysisController.calculateHeat = async (req, res) => {
  try {
    const { dimensions, WWR, SHGC, city } = req.body;
    const solarRadiation = {
      Bangalore: 200,
      Mumbai: 280,
      Kolkata: 300,
      Delhi: 220,
    };

    if (!solarRadiation[city]) {
      return res.status(400).json({ error: "Invalid city name" });
    }

    const area = dimensions.height * dimensions.width * WWR;
    const heatGain = area * SHGC * solarRadiation[city];

    res.json({ heatGain });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

analysisController.city = async (req, res) => {
  const rankings = [
    { city: "Bangalore", score: 85 },
    { city: "Mumbai", score: 78 },
    { city: "Kolkata", score: 90 },
    { city: "Delhi", score: 82 },
  ];
  res.json(rankings);
};

module.exports = analysisController;
