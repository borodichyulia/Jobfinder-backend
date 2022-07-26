import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Resume } from './entity/Resume';
import { Vacancy } from './entity/Vacancy';
import { CompanyProfile } from './entity/CompanyProfile';
import { ApplicantProfile } from './entity/ApplicantProfile';
import { User } from './entity/User';
import { Token } from './entity/Token';
import { Specialization } from './entity/Specialization';

const dotenv = require('dotenv');
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    Resume,
    Vacancy,
    CompanyProfile,
    ApplicantProfile,
    User,
    Token,
    Specialization,
  ],
  migrations: [],
  subscribers: [],
});
