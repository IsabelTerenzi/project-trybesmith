import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import OrderService from '../services/ordersService';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(statusCodes.OK).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const { productsIds } = req.body;
    
    const created = await this.orderService.create(productsIds, userId);
    res.status(statusCodes.CREATED).json(created);
  };
}

export default OrderController;