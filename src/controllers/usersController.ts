import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../statusCodes';
import UserService from '../services/usersService';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const token = jwt.sign({ user }, 'secret', { expiresIn: '7d' });
    await this.userService.create(user);

    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;