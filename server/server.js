const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 8080;

const songRouter = require("./controllers/songController");

app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: "http://localhost:3000", 
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/server-api", songRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
