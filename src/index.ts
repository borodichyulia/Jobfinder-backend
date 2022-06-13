import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from 'cors';
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { ResumeRoutes } from "./routes/ResumeRoutes"
import { VacancyRoutes } from "./routes/VacancyRoutes"
import { CompanyProfileRoutes } from "./routes/CompanyProfileRoutes"
import { ApplicantProfileRoutes } from "./routes/ApplicantProfileRoutes"

AppDataSource.initialize().then(async () => {
    const cors = require("cors");
    const app = express()
    app.use(bodyParser.json())

    var corsOptions = {
        origin: "http://localhost:3001"
      };
      
      app.use(cors(corsOptions));

    
    ResumeRoutes.forEach(route => {
        app[route.method](route.route, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    })

    VacancyRoutes.forEach(route => {
        app[route.method](route.route, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    })
    
    CompanyProfileRoutes.forEach(route => {
        app[route.method](route.route, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    })


    ApplicantProfileRoutes.forEach(route => {
        app[route.method](route.route, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    })
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
