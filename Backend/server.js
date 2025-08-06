import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongoDb.js";
import ExpressError from "./utils/ExpressError.js";
import UrlRouter from "./routes/Url.js";
import userAuth from "./routes/userAuth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("", UrlRouter);

app.use("/user",userAuth);

// Error Handler - catch all unmatched routes
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  console.log(err);
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(5000, () => {
  connectDB();
  console.log("http://localhost:5000/");
});
