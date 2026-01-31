import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({ path: "./.env" });

const app = express();

/* ✅ Basic route */
app.get("/", (req, res) => {
  res.send("Server is running ");
});

/* ✅ DB connect then server start */
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });
