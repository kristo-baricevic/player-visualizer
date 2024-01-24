const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const wavDeleteController = async (req, res) => {
  try {
    const wavFilePath = path.join(
      __dirname,
      "..",
      "public",
      "music",
      "wavs",
      `track3.wav`
    );

    await fs.unlink(wavFilePath);
    console.log("WAV file deleted successfully");
    res.status(200).send("WAV file deleted successfully");
  } catch (error) {
    console.error("Error deleting WAV file:", error);
    res.status(500).send("Error deleting WAV file");
  }
};

router.post("/", wavDeleteController);
module.exports = router;

