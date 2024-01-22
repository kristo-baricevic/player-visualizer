"use strict";
const express = require("express");
const router = express.Router();
var essentia = require('essentia.js');
const fetch = require('node-fetch');
const fs = require('fs').promises; 
const wav = require('node-wav');
const Mp32Wav = require('mp3-to-wav');
const path = require('path');


const FRAME_SIZE = 2048;
const HOP_SIZE = 1024;

const convertMp3ToWav = async (mp3FilePath, wavFileDir, songIndex) => {
    try {
        console.log("Attempting to convert MP3 to WAV file:");
        const mp32Wav = new Mp32Wav(mp3FilePath, wavFileDir);
        await mp32Wav.exec();
        console.log("mp3-to-wav completed.");
        // Construct the path to the saved WAV file
        const wavFilePath = `${wavFileDir}/song${songIndex}/track3.wav`;
        return wavFilePath;
    } catch (error) {
        console.error("Error in convertMp3ToWav:", error);
        throw error;
    }
};


const decodeWavFile = async (wavFilePath) => {
    if (!wavFilePath) {
        console.error("Error in decodeWavFile: wavFilePath is null");
        return null;
    }
    try {
        console.log("Attempting to decode WAV file:", wavFilePath);
        const buffer = await fs.readFile(wavFilePath);
        let audio = wav.decode(buffer);
        return audio.channelData[0]; // Assuming mono audio
    } catch (error) {
        console.error("Error decoding WAV file:", error);
        throw error;
    }
};

const analyzeWav = async (audioBuffer) => {
    if (!audioBuffer) {
        console.error("Error in analyzeWav: audioBuffer is null");
        return null;
    }

    try {
        let spectralCentroids = [];
        for (let i = 0; i < audioBuffer.length/HOP_SIZE; i++) {
            let frame = audioBuffer.slice(HOP_SIZE*i, HOP_SIZE*i + FRAME_SIZE);
            var frame_windowed = essentia.Windowing(essentia.arrayToVector(frame), true, FRAME_SIZE);
            let centroid = essentia.Centroid(essentia.Spectrum(frame_windowed['frame'])['spectrum']);
            spectralCentroids.push(centroid);
        }
        return spectralCentroids;
    } catch (error) {
        console.error("Error in analyzeWav:", error);
        throw error;
    }
};

const analyzeSong = async (req, res) => {
    try {
        const currentSongIndex = req.params.songIndex;
        const mp3FilePath = path.join(__dirname, '..', 'public', 'music', `song${currentSongIndex}`, 'track3.mp3');
        const wavFileDir = path.join(__dirname, '..', 'public', 'music', 'wavs');

        const wavFilePath = await convertMp3ToWav(mp3FilePath, wavFileDir, currentSongIndex);
        const audioBuffer = await decodeWavFile(wavFilePath);
        const analysisResult = await analyzeWav(audioBuffer);

        res.json({ analysisResult: analysisResult });
    } catch (error) {
        console.error("Error analyzing song:", error);
        res.status(500).send("Error analyzing song");
    }
};

router.post("/:songIndex", analyzeSong);
module.exports = router;
