import { NextFunction, Request, Response } from 'express';
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
    const {
      title,
      salary,
      reqExperience,
      schedule,
      city,
      generalInfo,
      contacts,
    } = request.body;

    const vacancyToAdd = AppDataSource.getRepository(Vacancy).create({
      title: title,
      salary: salary,
      reqExperience: reqExperience,
      schedule: schedule,
      city: city,
      generalInfo: generalInfo,
      contacts: contacts,
    });

    await AppDataSource.getRepository(Vacancy).save(vacancyToAdd);
    response.send(vacancyToAdd);
  }

  async remove(request: Request, response: Response) {
    console.log(request.params.id);
    let vacancyToRemove = await vacancyRepository.findBy({
      id: request.params.id,
    });
    vacancyRepository.remove(vacancyToRemove);
    response.send(vacancyToRemove);
  }
}
