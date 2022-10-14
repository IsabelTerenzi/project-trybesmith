import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';
import { authenticateToken } from './jwtAuthorization';
import OrderSchema from './orderValidation';
import ProductSchema from './productValidation';
import UserSchema from './userValidation';
import LoginSchema from './loginValidation';

const required = 'any.required';

const authValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const payload = authenticateToken(authorization);
    res.locals.userId = payload.id;
    next();
  } catch (error) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const login = req.body;
  const { error } = LoginSchema.validate(login);

  if (error) {
    const messageStatus = error.details[0].type;
    
    if (messageStatus === required) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }

    return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }
  
  next();
};

const productValidation = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body;
  const { error } = ProductSchema.validate(product);

  if (error) {
    const messageStatus = error.details[0].type;

    if (messageStatus === required) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }

    return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }

  next();
};

const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const { error } = UserSchema.validate(user);

  if (error) {
    const messageStatus = error.details[0].type;

    if (messageStatus === required) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }
  next();
};

const orderValidation = (req: Request, res: Response, next: NextFunction) => {
  const order = req.body;
  
  const { error } = OrderSchema.validate(order);

  if (error) {
    const messageStatus = error.details[0].type;

    if (messageStatus === required) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }

    return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }

  next();
};

export default {
  authValidation,
  loginValidation,
  productValidation,
  userValidation,
  orderValidation,
};