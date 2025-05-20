// index.js
const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.38.20:3000"], // add your PC's IP here
  })
);

app.use(express.json());

// Routes
app.use("/api", require("./Routes/Createuser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect to MongoDB first, then start server
mongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
