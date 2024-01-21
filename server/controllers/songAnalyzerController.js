"use strict";
const express = require("express");
const router = express.Router();
let essentia = require("essentia.js");
const fetch = require('node-fetch');
let fs = require('fs');
const Mp32Wav = require('mp3-to-wav');

const createWavFile = ( currentSongIndex ) => { 
    const wavSource = new Mp32Wav(`http://localhost:8080/music/song${currentSongIndex}/track3.mp3`).toWav();
    return wavSource.toWav();
}

const analyzeSong = async (req, res) => {
  console.log("analyzeSong params" + req.params.songIndex);
  try {
    // Assuming audio data is sent in the request body
    const currentSongIndex = req.params.songIndex;
    const audioResponse = await createWavFile(currentSongIndex);
    if (!audioResponse.ok) {
      throw new Error("Failed to fetch audio file");
    }
    console.log(audioResponse);
    const audioData = await audioResponse.arrayBuffer();

    // Initialize Essentia and process the audio data
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
