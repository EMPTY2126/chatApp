import express, { json } from "express";
import dotenv from "dotenv";
import { router } from "./router/router.js";
import cors from 'cors'
import connectDB from "./db/connect.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000
const URI = process.env.URI



app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(json());
app.use('/',router);


app.listen(PORT,connectDB(),()=>console.log(`App running on port: ${PORT}`));