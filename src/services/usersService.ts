import connection from '../models/connection';
import UserModel from '../models/usersModel';
import { User, Login, Payload } from '../interfaces/userInterface';
import { createToken } from '../middlewares/jwtAuthorization';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getUser({ username, password }: Login) {
    const user = await this.model.getUser({ username, password }); 
    return user;
  }

  public async create(user: User): Promise<string> {
    const userCreated = await this.model.create(user);

    const payload: Payload = {
      id: userCreated,
      username: user.username,
    };

    const token = createToken(payload);
    return token;
  }
}

export default UserService;