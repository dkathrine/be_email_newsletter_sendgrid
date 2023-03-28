import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);

const main = async() => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${process.env.MONGODB_CONNECTION}/SendGridTesting`);
}
main().catch((err) => console.log(`Connection failed!: ${err}`));

app.listen(port, () => console.log(`Server listening on ${port}`));