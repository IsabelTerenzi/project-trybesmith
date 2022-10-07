import { Pool } from 'mysql2/promise';
import Order from '../interfaces/orderInterface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT orders.id as id, orders.userId as userId, JSON_ARRAYAGG(products.id) as productsIds
      FROM Trybesmith.Orders as orders
      INNER JOIN Trybesmith.Products as products
      ON orders.id = products.orderId
      GROUP BY orders.id
      ORDER BY orders.userId`,
    );
    // JSON_ARRAYAGG returns result set as single JSON array
    const [rows] = result;
    return rows as Order[];
  }
}