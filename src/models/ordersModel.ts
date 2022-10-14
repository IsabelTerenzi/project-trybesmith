import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Order from '../interfaces/orderInterface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `SELECT orders.id as id, orders.userId as userId, JSON_ARRAYAGG(products.id) as productsIds
      FROM Trybesmith.Orders as orders
      INNER JOIN Trybesmith.Products as products
      ON orders.id = products.orderId
      GROUP BY orders.id`,
    );
    // JSON_ARRAYAGG returns result set as single JSON array
    return result as Order[];
  }

  public async create(productsIds: number[], userId: number): Promise<number> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );

    productsIds.forEach(async (id) => {
      await this.connection.execute<ResultSetHeader>(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [insertId, id],
      );
    });
    return insertId;
  }
}