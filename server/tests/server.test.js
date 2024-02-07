const express = require("express");
const request = require("supertest");
const app = express();
const cors = require("cors");
const path = require("path");
const fetch = require('node-fetch');

const songRouter = require("../controllers/songController.js");
const songAnalyzerRouter = require("../controllers/songAnalyzerController");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

jest.mock('node-fetch');

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/music", cors(corsOptions), express.static(path.join(__dirname, "public/music")));
app.use("/server-api", songRouter);
app.use("/analyze", songAnalyzerRouter);

const mockContextValue = {
  isPlaying: false,
  isLoading: false,
  currentSongIndex: 0,
  progress: 0,
  setProgress: jest.fn(),
  currentSong: null,
  trackLinerNotes: [],
  nextSong: jest.fn(),
  prevSong: jest.fn(),
  isMuted: [false, false, false],
  volume: 1,
  getAudioContext: jest.fn(),
  loadNewSong: mockLoadNewSong, 
  playPauseTracks: jest.fn(),
  toggleMuteTrack: jest.fn(),
};





// Middleware Tests
describe("Testing the use of middleware", () => {
  test("Testing the use of middleware for the /images route", async () => {
    const response = await request(app)
      .get("/images/test.png")
      .set("Origin", "http://localhost:3000");
    expect(response.status).toBe(200);
  });

  test("Testing the use of middleware for the /music route", async () => {
    const response = await request(app)
      .get("/music/test.mp3")
      .set("Origin", "http://localhost:3000");
    expect(response.status).toBe(200);
  });

  test("Testing for a non-existent file in the /images route", async () => {
    const response = await request(app)
      .get("/images/non_existent.png")
      .set("Origin", "http://localhost:3000");
    expect(response.status).toBe(404); // Assuming 404 for not found
  });
  
  test("Testing the /images route with an unauthorized origin", async () => {
    const response = await request(app)
      .get("/images/test.png")
      .set("Origin", "http://unauthorized-origin.com");
    expect(response.status).toBe(403); // Assuming 403 for forbidden
  });
});

// songRouter Tests
describe("songRouter", () => {
  it("GET /server-api/songs should return a list of songs", async () => {
    const response = await request(app).get("/server-api/songs");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Additional assertions as needed
  });

  // Additional tests for other endpoints and methods in songRouter
});

// songAnalyzerRouter Tests
describe("songAnalyzerRouter", () => {
    it("POST /analyze should analyze a song", async () => {
      // Assuming songIndex is 1
      const songIndex = 1;
      const response = await request(app).post(`/analyze/${songIndex}`);
      expect(response.status).toBe(200);
      // Expectations for the analysis result
    });
  
    // Additional tests for other endpoints and methods in songAnalyzerRouter
  });