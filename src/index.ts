import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { createConnection, getCustomRepository, getRepository, useContainer as useTypeormContainer } from 'typeorm';
import { Action, useContainer as useRoutingControllersContainer, useExpressServer } from 'routing-controllers';
import {User} from "./entity/User";
import {Container} from "typedi";
import { UserRepository } from './repository/UserRepository';
import config from './config/config';
import { AuthenticationRequiredError } from './error/AuthenticationRequiredError';
import { InvalidAuthenticationTokenError } from './error/InvalidAuthenticationTokenError';
import { AccessDeniedError } from './error/AccessDeniedError';

const server = express();

useTypeormContainer(Container);

createConnection().then(async connection => {

  server.use(cors());
  server.use(helmet());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());

  // its important to set container before any operation you do with routing-controllers,
  // including importing controllers
  useRoutingControllersContainer(Container);

  useExpressServer(server, {
    // register created express server in routing-controllers
    development: false,
    routePrefix: "/api",
    controllers: [__dirname + "/controllers/**/*.ts"], // and configure it the way you need (controllers, validation, etc.)
    middlewares: [__dirname + "/middlewares/**/*.ts"],
    interceptors: [__dirname + "/interceptors/**/*.ts"],
    defaultErrorHandler: false, // disable default error handler, only if you have your own error handler
    authorizationChecker: async ({request}: Action, roles: string[]) => {

      const token = request.cookies["access_token"];
      if(!token) throw new AuthenticationRequiredError();

      const userRepository = getCustomRepository(UserRepository);

      let user: User|undefined;

      try {
         user = await userRepository.findByToken(token, config.jwtAuthSecret, {activated: true});
      } catch (e) {
        throw new InvalidAuthenticationTokenError();
      }

      if (user && !roles.length)
        return true;

      if (user && roles.includes(user.role))
        return true;
      else throw new AccessDeniedError();

      return false;
    },
    currentUserChecker: async ({request}: Action) => {
      const token = request.cookies["access_token"];

      const userRepository = getCustomRepository(UserRepository);

      return await userRepository.findByToken(token, config.jwtAuthSecret, {activated: true});
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


