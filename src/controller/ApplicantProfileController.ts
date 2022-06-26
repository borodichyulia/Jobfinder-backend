import { NextFunction, Request, Response } from 'express';
import { ApplicantProfile } from '../entity/ApplicantProfile';
import { AppDataSource } from '../data-source';

const applicantProfileRepository =
  AppDataSource.getRepository(ApplicantProfile);
export class ApplicantProfileController {
  async add(request: Request, response: Response) {
    const { name, surname, email, age, phone } = request.body;

    const applicantProfileToAdd = AppDataSource.getRepository(
      ApplicantProfile
    ).create({
      name: name,
      surname: surname,
      email: email,
      age: age,
      phone: phone,
    });

    await AppDataSource.getRepository(ApplicantProfile).save(
      applicantProfileToAdd
    );
    response.send(applicantProfileToAdd);
  }
}
