import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminRoutes'

const app = express()

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));


app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.use('/admin', adminRouter)


export default app;