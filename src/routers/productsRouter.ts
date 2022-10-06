import { Router } from 'express';
import ProductController from '../controllers/productsController';

const productsRouter = Router();

const productController = new ProductController();

productsRouter.post('/', productController.create);

export default productsRouter;