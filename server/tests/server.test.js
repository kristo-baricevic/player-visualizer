// No need to do app.listen(PORT, ...) in test files
// Supertest handles this internally


const express = require("express");
const request = require("supertest");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 8080;

const songRouter = require("./controllers/songController");
const songAnalyzerRouter = require("./controllers/songAnalyzerController");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  "/music",
  cors(corsOptions),
  express.static(path.join(__dirname, "public/music"))
);

app.use("/server-api", songRouter);
app.use("/analyze", songAnalyzerRouter);

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
});

// Testing for a non-existent file in the /images route
test("Testing for a non-existent file in the /images route", async () => {
    const response = await request(app)
      .get("/images/non_existent.png")
      .set("Origin", "http://localhost:3000");
    expect(response.status).toBe(404); // Assuming 404 for not found
  });
  
  // Testing with an unauthorized origin
  test("Testing the /images route with an unauthorized origin", async () => {
    const response = await request(app)
      .get("/images/test.png")
      .set("Origin", "http://unauthorized-origin.com");
    expect(response.status).toBe(403); // Assuming 403 for forbidden
  });
  

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

describe("songRouter", () => {
    it("should route requests to the correct controller", async () => {
      const req = {
        method: "GET",
        url: "/server-api",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await songRouter(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("GET /server-api/songs", () => {
    it("should return a list of songs", async () => {
      const response = await request(app).get("/server-api/songs");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      // Add more assertions as needed
    });
  
    // Add more tests for POST, PUT, DELETE as needed
  });

  describe("songAnalyzerRouter", () => {
    // Test for GET request
    describe("GET /analyze", () => {
      it("should analyze a song", async () => {
        const response = await request(app).get("/analyze?songId=123");
        expect(response.status).toBe(200);
        // Expectations for the analysis result
      });
    });
  
    // Additional tests for other endpoints and methods
  });

describe("songAnalyzerRouter", () => {
    it("should route requests to the correct controller", async () => {
      const req = {
        method: "GET",
        url: "/analyze",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await songAnalyzerRouter(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });