const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const songRouter = require("./controllers/songController");

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get("/api/home", (req, res) => {
  res.json({ message: "Like this video!", people: ["Arpan", "Jack", "Barry"] });
});

app.use('/api', songRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
