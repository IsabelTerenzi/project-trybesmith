import { Router } from 'express';
import OrderController from '../controllers/ordersController';
import fieldsValidation from '../middlewares/fieldsValidation';

const { orderValidation, authValidation } = fieldsValidation;

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', authValidation, orderValidation, orderController.create);

export default orderRouter;