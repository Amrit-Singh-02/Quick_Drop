import { Router } from "express";
import {
  fetchProduct,
  fetchProducts,
} from "../../controllers/shop/product.controller.js";

const router = Router();

router.get("/all", fetchProducts);
router.get("/one/:id", fetchProduct);

export default router;
