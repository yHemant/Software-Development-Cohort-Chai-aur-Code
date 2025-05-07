import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DataBase connection successfull")
    })
    .catch((error)=>{
        console.log('Error connecting DB ', error)
    })
}

export default db;