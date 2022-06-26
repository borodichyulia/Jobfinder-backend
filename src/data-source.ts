import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Resume } from './entity/Resume';
import { Vacancy } from './entity/Vacancy';
import { CompanyProfile } from './entity/CompanyProfile';
import { ApplicantProfile } from './entity/ApplicantProfile';
import { User } from './entity/User';
import { Token } from './entity/Token';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Resume, Vacancy, CompanyProfile, ApplicantProfile, User, Token],
  migrations: [],
  subscribers: [],
});
