import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../../utils/ApiResponse.util.js";
import ProductModel from "../../models/product.model.js";

export const addProduct = expressAsyncHandler(async (req, res)=>{
    const { name, stock, price, description, category, salePrice, brand } =
    req.body;

      const newProduct = await ProductModel.create({
    name,
    stock,
    price,
    description,
    category,
    brand
  });

  new ApiResponse(201, "Product Added Successfully", newProduct).send(res);
})