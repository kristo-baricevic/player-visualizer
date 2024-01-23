const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

router.post("/:songIndex", async (req, res) => {
  try {
    const songIndex = req.params.songIndex;
    const wavFilePath = path.join(
      __dirname,
      "..",
      "public",
      "music",
      "wavs",
      `track3-${songIndex}.wav`
    );

    await fs.unlink(wavFilePath);
    res.status(200).send("WAV file deleted successfully");
  } catch (error) {
    console.error("Error deleting WAV file:", error);
    res.status(500).send("Error deleting WAV file");
  }
});

module.exports = router;
