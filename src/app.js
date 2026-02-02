import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
const app = express();
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.post("/ping", (req, res) => {
  console.log("PING HIT");
  res.send("pong");
});
/* CORS */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/* Body parsers */
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/* Static files */
app.use(express.static("public"));

/* Cookies */
app.use(cookieParser());

/* Routes */


app.use("/api/v1/users", userRouter);

export default app;
