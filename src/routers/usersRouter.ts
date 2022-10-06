import { Router } from 'express';
import UserController from '../controllers/usersController';

const usersRouter = Router();

const usersController = new UserController();

usersRouter.post('/', usersController.create);

export default usersRouter;