import { Pool } from 'mysql2/promise';
import Login from '../interfaces/loginInterface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getUser({ username, password }: Login): Promise<Login[]> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    const [user] = result;
    return user as Login[];
  }
}