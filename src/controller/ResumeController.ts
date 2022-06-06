import { NextFunction, Request, Response } from "express"
import { Resume } from "../entity/Resume"
import { AppDataSource } from "../data-source"

const resumeRepository = AppDataSource.getRepository(Resume)
export class ResumeController {

    async findBySpecialization(request: Request, response: Response) {
        const foundResumes = await resumeRepository.findBy({ profession: request.query.profession })
        response.send(foundResumes);
    }

    async add(request: Request, response: Response) {
        const {
            name,
            secondName,
            dateofBirth,
            gender,
            email,
            country,
            placeOfEducation,
            periodOfEducation,
            specialization,
            prevCompany,
            periodOfWork,
            profession,
            generalInfo,
            contacts
        } = request.body;

        const resumeToAdd = AppDataSource.getRepository(Resume).create({
            name: name,
            secondName: secondName,
            dateofBirth: dateofBirth,
            gender: gender,
            email: email,
            country: country,
            placeOfEducation: placeOfEducation,
            periodOfEducation: periodOfEducation,
            specialization: specialization,
            prevCompany: prevCompany,
            periodOfWork: periodOfWork,
            profession: profession,
            generalInfo: generalInfo,
            contacts: contacts
        });

        await AppDataSource.getRepository(Resume).save(resumeToAdd);
        response.send(resumeToAdd);

    }



}