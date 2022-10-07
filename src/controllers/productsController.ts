import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../services/productService';
import ProductSchema from '../middlewares/productValidation';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const { error } = ProductSchema.validate(product);

    if (error) {
      const messageError = error.details[0].message;
      const messageStatus = error.details[0].type;

      if (messageStatus === 'string.base' || messageStatus === 'string.min') {
        return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: messageError });
      }

      return res.status(statusCodes.BAD_REQUEST).json({ message: messageError });
    }

    const productCreated = await this.productService.create(product);
    res.status(statusCodes.CREATED).json(productCreated);
  };
}

export default ProductController;