import { NextFunction, Request, Response } from "express"
import { ApplicantProfile } from "../entity/ApplicantProfile"
import { AppDataSource } from "../data-source"

const applicantProfileRepository = AppDataSource.getRepository(ApplicantProfile)
export class CompanyProfileController {

    // async findByName(request: Request, response: Response) {
    //     const foundCompany = await applicantProfileRepository.findBy({ name: request.query.name })
    //     response.send(foundCompany);
    // }

    async add(request: Request, response: Response) {
        const {
            name,
            surname,
            email,
            age,
            phone
        } = request.body;

        const applicantProfileToAdd = AppDataSource.getRepository(ApplicantProfile).create({
            name: name,
            surname: surname,
            email: email,
            age: age,
            phone: phone
        });

        await AppDataSource.getRepository(ApplicantProfile).save(applicantProfileToAdd);
        response.send(applicantProfileToAdd);

    }

    // async remove(request: Request, response: Response) {
    //     console.log(request.params.id);
    //     let vacancyToRemove = await companyProfileRepository.findBy({ id: request.params.id });
    //     companyProfileRepository.remove(vacancyToRemove);
    //     response.send(vacancyToRemove);
    // }  



}