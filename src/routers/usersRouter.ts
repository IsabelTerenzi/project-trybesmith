import { Router } from 'express';
import UserController from '../controllers/usersController';
import fieldsValidation from '../middlewares/fieldsValidation';

const { userValidation } = fieldsValidation;

const usersRouter = Router();

const usersController = new UserController();

usersRouter.post('/', userValidation, usersController.create);

export default usersRouter;