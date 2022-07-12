import { Request, Response } from 'express';

import { Resume } from '../entity/Resume';
import { ApplicantProfile } from '../entity/ApplicantProfile';
import { Vacancy } from '../entity/Vacancy';
import { AppDataSource } from '../data-source';
import { cloudinary } from '../utils/cloudinary';
import { ApiError } from '../exeptions/api-error';
import { Constants } from '../constants/constants';

const resumeRepository = AppDataSource.getRepository(Resume);
export class ResumeController {
  async findBySpecialization(request: Request, response: Response) {
    const foundResumes = await AppDataSource.getRepository(Resume).findBy({
      profession: request.query.profession,
    });
    response.send(foundResumes);
  }

  async add(request: Request, response: Response) {
    try {
      const fileStr = request.files.data;
      const uploadResponse = await cloudinary.uploader.upload(
        fileStr.tempFilePath,
        {
          upload_preset: 'resume',
        }
      );

      const {
        name,
        secondName,
        dateOfBirth,
        gender,
        email,
        country,
        placeOfEducation,
        startOfEducation,
        endOfEducation,
        specialization,
        prevCompany,
        startOfWork,
        endOfWork,
        profession,
        generalInfo,
        contacts,
        applicantId,
      } = request.body;
      const imgUrl = uploadResponse.url;
      const applicant = await AppDataSource.getRepository(
        ApplicantProfile
      ).findOne({ where: { id: applicantId } });

      const resumeToAdd = resumeRepository.create({
        name: name,
        secondName: secondName,
        dateOfBirth: dateOfBirth,
        gender: gender,
        email: email,
        country: country,
        placeOfEducation: placeOfEducation,
        startOfEducation: startOfEducation,
        endOfEducation: endOfEducation,
        specialization: specialization,
        prevCompany: prevCompany,
        startOfWork: startOfWork,
        endOfWork: endOfWork,
        profession: profession,
        generalInfo: generalInfo,
        contacts: contacts,
        imgUrl: imgUrl,
        applicant: applicant,
      });

      await resumeRepository.save(resumeToAdd);
      response.send(resumeToAdd);
    } catch (err) {
      throw ApiError.UnsupportedImage(Constants.messageErrorImage);
    }
  }

  async remove(request: Request, response: Response) {
    const profileToRemove = await resumeRepository.findBy({
      id: request.params.id,
    });
    resumeRepository.remove(profileToRemove);
    response.send(profileToRemove);
  }

  async applyVacancy(request: Request, response: Response) {
    const { vacancyId } = request.body;
    const vacancyToAdd = await AppDataSource.getRepository(Vacancy).findOne({
      where: { id: vacancyId },
    });
    const resumeForApply = await resumeRepository.findOne({
      where: { id: request.params.id },
      relations: ['vacancies'],
    });

    resumeForApply.vacancies = resumeForApply.vacancies.concat(vacancyToAdd);

    const resumeWithApply = await resumeRepository.save(resumeForApply);
    response.send(resumeWithApply);
  }
}
