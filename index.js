import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import ConectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import HFRoutes from './routes/HFRoutes.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
ConectDB();

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/create',HFRoutes);

app.get('/', async(req, res) => {
    res.send('Hello from HF!')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})