import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/database.js";
import { connectToPassport } from "./utils/Provider.js"
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
//setting up the env variable file
dotenv.config({path: "./config/config.env",});

// using middlewares
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
  extended: true, 
}))

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

//connecting to passport
connectToPassport();

//connecting to mongoDb
connectToDb();

//Importing user routes
import userRouter from './routes/user.js'
import orderRouter from './routes/orders.js'

app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);

app.use(errorMiddleware)

app.get("/", (req, res, next) => {
  res.send("<h1>Priyanshu Batham</h1>");
});

export default app;
