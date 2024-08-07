import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoute.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoutes.js';
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("database message : "+err.message);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err , req , res , next)=>{
    res.status(500).send({message : err.message});
});

const port = process.env.PORT || 5000;
app.listen(port , ()=>{
    console.log(`Server is setup at http://localhost:${port}`);
})