import connection from '../models/connection';
import LoginModel from '../models/loginModel';
import Login from '../interfaces/loginInterface';

class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async getUser({ username, password }: Login): Promise<Login[]> {
    return this.model.getUser({ username, password });
  }
}

export default LoginService;