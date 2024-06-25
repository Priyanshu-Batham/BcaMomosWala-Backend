import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/database.js";
import { connectToPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
//setting up the env variable file
dotenv.config({ path: "./config/config.env" });

// using middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      //change it back after experimenting
      // secure: process.env.NODE_ENV === "development" ? false : true,
      // httpOnly: process.env.NODE_ENV === "development" ? false : true,
      // sameSite: process.env.NODE_ENV === "development" ? false : "none",
      secure: true,
      httpOnly: false,
      sameSite: "none",
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://bcamomoswala.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

//connecting to passport
connectToPassport();

//connecting to mongoDb
connectToDb();

//Importing user routes
import userRouter from "./routes/user.js";
import orderRouter from "./routes/orders.js";

app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

app.use(errorMiddleware);

app.get("/", (req, res, next) => {
  res.send("<h1>Priyanshu Batham</h1>");
});

export default app;
