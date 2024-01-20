"use strict";
const express = require("express");
const router = express.Router();
const Essentia = require("essentia.js");
let fetch;

(async () => {
  fetch = (await import("node-fetch")).default;
})();

const analyzeSong = async (req, res) => {
  console.log("analyzeSong params" + req.params.songIndex);
  try {
    // Assuming audio data is sent in the request body
    const currentSongIndex = req.params.songIndex;
    const audioResponse = await fetch(
      `http://localhost:8080/music/song${currentSongIndex}/track3.mp3`
    );
    if (!audioResponse.ok) {
      throw new Error("Failed to fetch audio file");
    }
    const audioData = await audioResponse.arrayBuffer();

    // Initialize Essentia and process the audio data
    const essentia = new Essentia();
    const audioAnalysisResult = essentia.SpectralCentroid(audioData);
    console.log("analysisResult: " + audioAnalysisResult);
    // Send back the analysis results
    res.json({ analysisResult: audioAnalysisResult });
  } catch (error) {
    console.error("Error analyzing song:", error);
    res.status(500).send("Error analyzing song");
  }
};

router.post("/:songIndex", analyzeSong);

module.exports = router;
