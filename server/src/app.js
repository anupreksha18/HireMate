import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import testRouter from './routes/test.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
const app=express();

app.use(cors(({origin:process.env.CORS_ORIGIN})));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Hello From HireMate Backend!!!');
});
app.get('/fail', (req, res) => {
  throw new Error("Something went wrong");
});

app.use('/api/test',testRouter)
app.use(notFound);
app.use(errorHandler);

export {app};