import express, { Request, Response } from 'express';
import router from './routes';
import logger from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import {createConnection, getRepository} from "typeorm";
import {Action, useExpressServer} from "routing-controllers";
import {UserController} from "./controllers/UserController";
import {User} from "./entity/User";

const server = express();

createConnection().then(async connection => {

  server.use(cors());
  server.use(helmet());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());

  // server.get('/', (req: Request, res: Response) => {
  //   res.redirect(g'/api');
  // });
  //
  // server.use('/api', router);

  useExpressServer(server, {
    // register created express server in routing-controllers
    routePrefix: "/api",
    controllers: [__dirname + "/controllers/**/*.ts"], // and configure it the way you need (controllers, validation, etc.)
    middlewares: [__dirname + "/middlewares/**/*.ts"],
    interceptors: [__dirname + "/interceptors/**/*.ts"],
    authorizationChecker: async ({request, response}: Action, roles: string[]) => {

      const token = request.cookies["access_token"];

      console.log(token);
      response.cookies('access_token',"caca");

      return true;

      const userRepository = getRepository(User);

      // if (user && !roles.length)
      //   return true;
      //
      // if (user && roles.find(role => user.roles.indexOf(role) !== -1))
      //   return true;

      return false;
    }
  });

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


