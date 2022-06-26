import { Request, Response } from 'express';

import { ApplicantProfile } from '../entity/ApplicantProfile';
import { AppDataSource } from '../data-source';

const applicantProfileRepository =
  AppDataSource.getRepository(ApplicantProfile);
export class ApplicantProfileController {
  async add(request: Request, response: Response) {
    const applicantProfileToAdd = AppDataSource.getRepository(
      ApplicantProfile
    ).create({
      ...request.body,
    });

    await AppDataSource.getRepository(ApplicantProfile).save(
      applicantProfileToAdd
    );
    response.send(applicantProfileToAdd);
  }
}
