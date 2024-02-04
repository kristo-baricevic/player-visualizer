const { analyzeSong } = require('../controllers/songAnalyzerController'); 

jest.mock('fs').promises;
jest.mock('node-fetch');
jest.mock('mp3-to-wav');
jest.mock('wav-decoder');

const fs = require('fs').promises;
const fetch = require('node-fetch');
const Mp32Wav = require('mp3-to-wav');
const wavDecoder = require('wav-decoder');

describe('Audio Analysis Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Successfully analyzes a song', async () => {
    const req = { params: { songIndex: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    fs.readFile.mockResolvedValue(Buffer.from('fake wav data'));
    wavDecoder.decode.mockResolvedValue({ sampleRate: 44100, channelData: [new Float32Array(1024)] });
    Mp32Wav.prototype.exec.mockImplementation(() => {});

    await analyzeSong(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalledWith(500);
  });

  test('Handles error when WAV file reading fails', async () => {
    const req = { params: { songIndex: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    fs.readFile.mockRejectedValue(new Error('Failed to read WAV file'));

    await analyzeSong(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error analyzing song');
  });

  test('Handles error when WAV file decoding fails', async () => {
    const req = { params: { songIndex: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    fs.readFile.mockResolvedValue(Buffer.from('fake wav data'));
    wavDecoder.decode.mockRejectedValue(new Error('Failed to decode WAV file'));

    await analyzeSong(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error analyzing song');
  });

});
