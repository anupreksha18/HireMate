import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import testRouter from './routes/test.routes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import resumeRoute from './routes/resume.routes.js';

import dotenv from 'dotenv';
dotenv.config();
import { connectDb } from './config/db.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
const app=express();

connectDb(process.env.MONGO_URL);


app.use(cors(({origin:process.env.CORS_ORIGIN,credentials:true})));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Hello From HireMate Backend!!!');
});
app.get('/fail', (req, res) => {
  throw new Error("Something went wrong");
});

app.use('/api/test',testRouter)
app.use('/api/users',userRoutes)
app.use('/api/resumes',resumeRoute);
app.use(notFound);
app.use(errorHandler);

export {app};