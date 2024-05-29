const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
const userRoutes = require("./routes/userRoutes");
const userPlaylistRoutes = require("./routes/userPlaylistRoute");

app.use("/api/users/playlist", userPlaylistRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "fasal",
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
