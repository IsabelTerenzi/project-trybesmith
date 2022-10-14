import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { User, Login } from '../interfaces/userInterface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getUser({ username, password }: Login): Promise<User> {
    const [[result]] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    return result as User;
  }

  public async create({ username, classe, level, password }: User): Promise<number> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    return insertId;
  }
}