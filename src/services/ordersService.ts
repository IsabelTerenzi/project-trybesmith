import connection from '../models/connection';
import OrderModel from '../models/ordersModel';
import Order from '../interfaces/orderInterface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(productsIds: number[], userId: number): Promise<Order> {
    await this.model.create(productsIds, userId);

    const created = {
      userId,
      productsIds,
    };

    return created;
  }
}

export default OrderService;