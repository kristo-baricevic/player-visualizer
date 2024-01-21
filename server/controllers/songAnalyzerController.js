"use strict";
const express = require("express");
const router = express.Router();
const essentia = require("essentia.js");
const fetch = require('node-fetch');
const fs = require('fs').promises; 
const Mp32Wav = require('mp3-to-wav');
const wavDecoder = require('wav-decoder');

const decodeWavFile = async (wavFilePath) => {
    try {
        // Read the WAV file
        const buffer = await fs.readFile(wavFilePath);

        // Decode the WAV file
        const audioData = await wavDecoder.decode(buffer);

        // Now audioData contains the decoded audio data
        // Including sample rate, channel data, etc.
        return audioData;
    } catch (error) {
        console.error("Error decoding WAV file:", error);
        throw error;
    }
};


// Function to analyze WAV data
const analyzeWav = async (wavData) => {
    try {
        const decodedWavFile = await decodeWavFile(wavData);
        const audioAnalysisResult = essentia.SpectralCentroid(decodedWavFile);
        return audioAnalysisResult;
    } catch (error) {
        console.error("Error in analyzeWav:", error);
        throw error;
    }
};

const createWavFile = async (songIndex) => {
    try {
        if (!songIndex) {
            songIndex = 1;
        }

        // Directory to save the WAV files
        const wavFileDir = '/public/music/wavs';

        // Construct the MP3 file URL
        const mp3FilePath = `http://localhost:8080/music/song${songIndex}/track3.mp3`;

        // Initialize Mp32Wav with the MP3 file URL and the directory to save the WAV file
        const mp32Wav = new Mp32Wav(mp3FilePath, wavFileDir);

        // Convert and save the WAV file
        mp32Wav.exec();

        // Construct the path to the saved WAV file
        const wavFilePath = `${wavFileDir}/song${songIndex}/track3.wav`;

        return wavFilePath;
    } catch (error) {
        console.error("Error in createWavFile:", error);
        throw error;
    }
};


const analyzeSong = async (req, res) => {
    try {
        const currentSongIndex = req.params.songIndex;
        console.log("Analyzing song with index:", currentSongIndex);

        const wavFilePath = await createWavFile(currentSongIndex);
        console.log("WAV file path:", wavFilePath);

        const analysisResult = await analyzeWav(wavFilePath);
        console.log("Analysis result:", analysisResult);

        res.json({ analysisResult: analysisResult });
    } catch (error) {
        console.error("Error analyzing song:", error);
        res.status(500).send("Error analyzing song");
    }
};


router.post("/:songIndex", analyzeSong);

module.exports = router;
