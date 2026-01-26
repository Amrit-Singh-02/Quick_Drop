import express from "express";
import dotenv from 'dotenv';
dotenv.config({quiet:true});

import userRoutes from "./src/routes/user/user.routes.js"
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app=express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));  //~ to handle form data
app.use(express.json());                       //~ to handle json data

app.use("/api/v1/user",userRoutes)

app.use(errorMiddleware);  //~ Global error middleware (always used in last line)
export default app;