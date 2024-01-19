// songAnalyzerController.js

const Essentia = require('essentia.js');

const analyzeSong = async (req, res) => {
    try {
        // Assuming audio data is sent in the request body
        const audioData = req.body.audioData;

        // Initialize Essentia and process the audio data
        const essentia = new Essentia();
        const analysisResult = essentia.someAnalysisFunction(audioData);

        // Send back the analysis results
        res.json({ analysisResult });
    } catch (error) {
        console.error('Error analyzing song:', error);
        res.status(500).send('Error analyzing song');
    }
};

router.get("/analyze", analyzeSong);
module.exports = router;
