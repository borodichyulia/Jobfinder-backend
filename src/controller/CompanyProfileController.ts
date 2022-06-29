import { NextFunction, Request, Response } from 'express';

import { CompanyProfile } from '../entity/CompanyProfile';
import { AppDataSource } from '../data-source';

const companyProfileRepository = AppDataSource.getRepository(CompanyProfile);
export class CompanyProfileController {
  async findByName(request: Request, response: Response) {
    const foundCompany = await companyProfileRepository.findBy({
      name: request.query.name,
    });
    response.send(foundCompany);
  }

  async add(request: Request, response: Response) {
    const companyProfileToAdd = AppDataSource.getRepository(
      CompanyProfile
    ).create({
      ...request.body,
    });

    await AppDataSource.getRepository(CompanyProfile).save(companyProfileToAdd);
    response.send(companyProfileToAdd);
  }

  async remove(request: Request, response: Response) {
    const vacancyToRemove = await companyProfileRepository.findBy({
      id: request.params.id,
    });
    companyProfileRepository.remove(vacancyToRemove);
    response.send(vacancyToRemove);
  }
}
