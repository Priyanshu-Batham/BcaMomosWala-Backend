import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/database.js";
import { connectToPassport } from "./utils/Provider.js"
import session from "express-session";

const app = express();
//setting up the env variable file
dotenv.config({path: "./config/config.env",});

// using middlewares
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
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
import passport from "passport";
app.use('/api/v1', userRouter);


app.get("/", (req, res, next) => {
  res.send("<h1>Priyanshu Batham</h1>");
});

export default app;
