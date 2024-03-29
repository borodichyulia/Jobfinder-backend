import { Request, Response } from 'express';

import { cloudinary } from '../utils/cloudinary';
import { ApplicantProfile } from '../entity/ApplicantProfile';
import { AppDataSource } from '../data-source';
import { ApiError } from '../exeptions/api-error';
import { Constants } from '../constants/constants';

export class ApplicantProfileController {
  async add(request: Request, response: Response) {
    try {
      const fileStr = request.files.data;
      const uploadResponse = await cloudinary.uploader.upload(
        fileStr.tempFilePath,
        {
          upload_preset: 'application_profile',
        }
      );

      const { name, surname, email, age, phone } = request.body;
      const imgUrl = uploadResponse.url;
      const applicantProfileToAdd = AppDataSource.getRepository(
        ApplicantProfile
      ).create({
        name: name,
        surname: surname,
        email: email,
        age: age,
        phone: phone,
        imgUrl: imgUrl,
      });

      await AppDataSource.getRepository(ApplicantProfile).save(
        applicantProfileToAdd
      );

      response.send(applicantProfileToAdd);
    } catch (err) {
      throw ApiError.UnsupportedImage(Constants.messageErrorImage);
    }
  }

  async remove(request: Request, response: Response) {
    const profileToRemove = await AppDataSource.getRepository(
      ApplicantProfile
    ).findBy({
      id: request.params.id,
    });
    AppDataSource.getRepository(ApplicantProfile).remove(profileToRemove);
    response.send(profileToRemove);
  }

  async viewApplicant(request: Request, response: Response) {
    const applicants = await AppDataSource.getRepository(
      ApplicantProfile
    ).find();

    response.send(applicants);
  }

  async updateApplicantProfile(request: Request, response: Response) {
    try {
      const applicantId = request.params.applicantId;

      const fileStr = request.files.data;
      const uploadResponse = await cloudinary.uploader.upload(
        fileStr.tempFilePath,
        {
          upload_preset: 'application_profile',
        }
      );
      const { name, surname, email, age, phone } = request.body;
      const imgUrl = uploadResponse.url;

      const updateApplicantProfile = await AppDataSource.getRepository(
        ApplicantProfile
      ).update(applicantId, {
        name: name,
        surname: surname,
        email: email,
        age: age,
        phone: phone,
        imgUrl: imgUrl,
      });
      response.send(updateApplicantProfile);
    } catch (err) {
      throw ApiError.UnsupportedImage(Constants.messageErrorImage);
    }
  }
}
