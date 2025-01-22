import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js"

dotenv.config();
const app = express();

// Middleware
console.log("reached")
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
