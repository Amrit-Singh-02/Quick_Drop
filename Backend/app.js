import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

import productRoutes from './src/routes/shop/product.route.js' 
import adminRoutes from './src/routes/admin/product.route.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/admin/product', adminRoutes)
app.use('/api/v1/shop/product', productRoutes)


export default app;
