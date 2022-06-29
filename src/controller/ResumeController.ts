import { NextFunction, Request, Response } from 'express';

import { Resume } from '../entity/Resume';
import { AppDataSource } from '../data-source';

const resumeRepository = AppDataSource.getRepository(Resume);
export class ResumeController {
  async findBySpecialization(request: Request, response: Response) {
    const foundResumes = await AppDataSource.getRepository(Resume).findBy({
      profession: request.query.profession,
    });
    response.send(foundResumes);
  }

  async add(request: Request, response: Response) {
    const resumeToAdd = AppDataSource.getRepository(Resume).create({
      ...request.body,
    });

    await AppDataSource.getRepository(Resume).save(resumeToAdd);
    response.send(resumeToAdd);
  }

  async remove(request: Request, response: Response) {
    const profileToRemove = await resumeRepository.findBy({
      id: request.params.id,
    });
    resumeRepository.remove(profileToRemove);
    response.send(profileToRemove);
  }
}
