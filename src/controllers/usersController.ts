import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/usersService';
import { User, Login, Payload } from '../interfaces/userInterface';
import { createToken } from '../middlewares/jwtAuthorization';

class UserController {
  constructor(private userService = new UserService()) { }

  public getUser = async (req: Request, res: Response) => {
    const login: Login = req.body;

    const user = await this.userService.getUser(login);

    if (!user) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }

    const payload: Payload = {
      id: user.id,
      username: user.username,
    };

    const token = createToken(payload);

    res.status(statusCodes.OK).json({ token });
  };

  public create = async (req: Request, res: Response) => {
    const user: User = req.body;

    const token = await this.userService.create(user);

    return res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;