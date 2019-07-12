import { Request, Response, Router } from 'express';
import userRouter from './user.routes';

const router = Router();

router.get(
  '/',
  (req: Request, res: Response): Response => {
    return res.send('Welcome to Express.js Typescript API');
  },
);

router.use('/users', userRouter);

export default router;
