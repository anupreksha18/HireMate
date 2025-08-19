import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app=express();

app.use(cors(({origin:"process.env.CORS_ORIGIN"})));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Hello From HireMate Backend!!!');
});

export {app};