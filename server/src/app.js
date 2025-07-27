import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express();

const __dirname = path.resolve();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

import { stripeWebhook } from './controllers/hotelPurchase.controller.js';
app.post('/stripe', express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cookieParser())


//routes import 
import userRouter from "./routes/user.routes.js"
import hotelRouter from "./routes/hotel.routes.js"
import commentRouter from "./routes/comment.routes.js"
import bookingRouter from "./routes/booking.routes.js"
import errorHandler from './utils/ErrorHandler.js';

//routes declaration 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/hotels", hotelRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/booking",bookingRouter)

//http://localhost:8000/api/v1/users/register

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.use(errorHandler)

export { app }

