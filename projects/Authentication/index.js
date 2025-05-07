import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './utils/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (req, res)=>{
    res.end("Hello World")
})

db();

app.use('/api/v1/users', userRoutes); 

app.listen(PORT, ()=>{
    console.log("Port 3000 is listening")
})