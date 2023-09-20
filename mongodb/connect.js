import mongoose, { mongo } from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

const ConectDB = () => {
    mongoose.set('strictQuery',true);
    mongoose.connect(process.env.DB_URL)
    .then(() => ( console.log('DB connection successfull') ))
    .catch(error => ( console.log(`Error in DB connection error => ${error}`) ))
}

export default ConectDB;