import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';

import { AppDataSource } from './data-source';
import { ResumeRoutes } from './routes/ResumeRoutes';
import { VacancyRoutes } from './routes/VacancyRoutes';
import { CompanyProfileRoutes } from './routes/CompanyProfileRoutes';
import { ApplicantProfileRoutes } from './routes/ApplicantProfileRoutes';
import { UserRoutes } from './routes/UserRoutes';
import { errorMiddleware } from './middleware/error-middleware';
const fileupload = require('express-fileupload');

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const cors = require('cors');
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(fileupload({ useTempFiles: true }));

    const PORT = process.env.PORT || 3000;

    var corsOptions = {
      origin: 'http://localhost:3001',
    };

    app.use(cors(corsOptions));

    ResumeRoutes.forEach((route) => {
      app[route.method](
        route.route,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    VacancyRoutes.forEach((route) => {
      app[route.method](
        route.route,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    CompanyProfileRoutes.forEach((route) => {
      app[route.method](
        route.route,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    UserRoutes.forEach((route) => {
      app[route.method](
        route.route,
        ...route.validation,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response, next)
            .then(() => next)
            .catch((err) => console.log(err));
        }
      );
    });

    ApplicantProfileRoutes.forEach((route) => {
      app[route.method](
        route.route,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    app.use(errorMiddleware);

    app.listen(PORT);

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/users to see results'
    );
  })
  .catch((error) => console.log(error));
