import { Router } from 'express';
import ProductController from '../controllers/productsController';
import fieldsValidation from '../middlewares/fieldsValidation';

const { productValidation } = fieldsValidation;

const productsRouter = Router();

const productController = new ProductController();

productsRouter.get('/', productController.getAll);
productsRouter.post('/', productValidation, productController.create);

export default productsRouter;