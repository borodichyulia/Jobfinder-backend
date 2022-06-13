import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Resume } from "./entity/Resume"
import { Vacancy } from "./entity/Vacancy"
import { CompanyProfile } from "./entity/CompanyProfile"
import { ApplicantProfile } from "./entity/ApplicantProfile"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Resume, Vacancy, CompanyProfile, ApplicantProfile],
    migrations: [],
    subscribers: [],
})
