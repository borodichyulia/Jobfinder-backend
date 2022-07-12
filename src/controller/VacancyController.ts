import { Request, Response } from 'express';

import { Vacancy } from '../entity/Vacancy';
import { AppDataSource } from '../data-source';

const vacancyRepository = AppDataSource.getRepository(Vacancy);
export class VacancyController {
  async findBySpecialization(request: Request, response: Response) {
    const foundVacancies = await vacancyRepository.findBy({
      title: request.query.title,
    });
    response.send(foundVacancies);
  }

  async add(request: Request, response: Response) {
    const vacancyToAdd = AppDataSource.getRepository(Vacancy).create({
      ...request.body,
    });

    await AppDataSource.getRepository(Vacancy).save(vacancyToAdd);
    response.send(vacancyToAdd);
  }

  async remove(request: Request, response: Response) {
    const vacancyToRemove = await vacancyRepository.findBy({
      id: request.params.id,
    });
    vacancyRepository.remove(vacancyToRemove);
    response.send(vacancyToRemove);
  }
}
