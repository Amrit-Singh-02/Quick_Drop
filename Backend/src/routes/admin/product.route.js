import { Router } from "express";
import { addProduct } from "../../controllers/admin/product.controller.js";

const router = Router();

router.post('/add', addProduct)

export default router;