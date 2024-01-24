const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 8080;
const songRouter = require("./controllers/songController");
const songAnalyzerRouter = require("./controllers/songAnalyzerController");
const wavDeleteRouter = require("./controllers/wavDeleteController");


const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/music", express.static(path.join(__dirname, "public/music")));


app.use("/server-api", songRouter);
app.use("/analyze", songAnalyzerRouter);
app.use("/delete-wav", wavDeleteRouter); 


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
