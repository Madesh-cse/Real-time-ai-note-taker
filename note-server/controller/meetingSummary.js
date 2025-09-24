const axios = require("axios");

// --- Send transcript to summary Python service ---
exports.getSummary = async (req, res) => {
  try {
    const { transcript } = req.body;

    console.log("Received transcript from React:", transcript);


    const response = await axios.post("http://localhost:5000/summary", { transcript });

    console.log("📄 Summary received from Python:", response.data.summary);

    res.json({ summary: response.data.summary });
  } catch (err) {
    console.error("Error in getSummary:", err.message);
    res.status(500).json({ error: "Error generating summary" });
  }
};

// --- Send transcript to highlight Python service ---
exports.getHighlights = async (req, res) => {
  try {
    const { transcript } = req.body;

     console.log("Received transcript from React:", transcript);

    const response = await axios.post("http://localhost:5000/highlights", { transcript });
      console.log("⭐ Highlights received from Python:", response.data.highlights);
    res.json({ highlights: response.data.highlights });
  } catch (err) {
    console.error("Error in getHighlights:", err.message);
    res.status(500).json({ error: "Error generating highlights" });
  }
};
