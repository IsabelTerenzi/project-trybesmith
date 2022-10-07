import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../statusCodes';
import LoginService from '../services/loginService';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public getUser = async (req: Request, res: Response) => {
    const login = req.body;
    const { username, password } = login;

    if (!username) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"username" is required' });
    }
    if (!password) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"password" is required' });
    }

    const [user] = await this.loginService.getUser({ username, password });

    if (!user) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }
 
    const token = jwt.sign({ login }, 'secret', { expiresIn: '7d' });

    res.status(statusCodes.OK).json({ token });
  };
}

export default LoginController;