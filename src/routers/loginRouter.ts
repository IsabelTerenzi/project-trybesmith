import { Router } from 'express';
import UserController from '../controllers/usersController';
import fieldsValidation from '../middlewares/fieldsValidation';

const { loginValidation } = fieldsValidation;

const loginRouter = Router();

const userController = new UserController();

loginRouter.post('/', loginValidation, userController.getUser);

export default loginRouter;