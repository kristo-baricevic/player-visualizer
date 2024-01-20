const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 8080;

const songRouter = require("./controllers/songController");
const songAnalyzerRouter = require("./controllers/songAnalyzerController");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/music", express.static(path.join(__dirname, "public/music")));

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/server-api", songRouter);
app.use("/analyze/:songIndex", songAnalyzerRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
