import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';
import ProductSchema from './productValidation';
import UserSchema from './userValidation';

const productValidation = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body;
  const { error } = ProductSchema.validate(product);

  if (error) {
    const messageStatus = error.details[0].type;

    if (messageStatus === 'string.base' || messageStatus === 'string.min') {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
    }

    return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
  }

  next();
};

const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const { error } = UserSchema.validate(user);

  if (error) {
    const messageStatus = error.details[0].type;

    if (messageStatus === 'any.required') {
      return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }

    return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }

  next();
};

export default { productValidation, userValidation };
