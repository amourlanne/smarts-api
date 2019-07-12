import express, { Request, Response } from 'express';
import router from './routes';
import logger from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import {createConnection} from "typeorm";

const server = express();

createConnection().then(async connection => {

  server.use(cors());
  server.use(helmet());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());

  server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
  });

  server.use('/api', router);

  const { PORT = 3000 } = process.env;

// true if file is executed, exclude for jest
  if (require.main === module) {
    server.use(logger('dev'));
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  }
});

export default server;


