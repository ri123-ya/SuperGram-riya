import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRouter from "./routes/auth.route.js";
import cors from "cors";


const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use("/api/auth", authRouter);

const Port = process.env.PORT;

app.listen(Port, () => {
  console.log(`Server is running on port : ${Port}`);
  connectDB();
})
