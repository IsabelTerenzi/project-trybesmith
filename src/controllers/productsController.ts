import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../services/productService';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.create(product);
    res.status(statusCodes.CREATED).json(productCreated);
  };
}

export default ProductController;