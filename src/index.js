import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js"; // ✅ IMPORTANT

dotenv.config({ path: "./.env" });

/* DB connect then server start */
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });
