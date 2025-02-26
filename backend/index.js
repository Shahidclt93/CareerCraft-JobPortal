import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import { job } from "./job.js";
import session from "express-session";
import passport from "./utils/passport.js";
import MongoStore from "connect-mongo";

job.start();
dotenv.config({});
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://careercraft-frontend.onrender.com",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//routes
app.use("/auth", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
