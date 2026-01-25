import express from "express";
import dotenv from 'dotenv';
dotenv.config({quiet:true});

import userRoutes from "./src/routes/user/user.routes.js"

const app=express();
app.use(express.urlencoded({extended:true}));  //~ to handle form data
app.use(express.json());                       //~ to handle json data

app.use("/api/v1/user",userRoutes)
export default app;