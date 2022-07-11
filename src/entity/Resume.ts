import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ApplicantProfile } from '../entity/ApplicantProfile';
import { Vacancy } from '../entity/Vacancy';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  secondName: string;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  placeOfEducation: string;

  @Column()
  startOfEducation: string;

  @Column()
  endOfEducation: string;

  @Column()
  specialization: string;

  @Column()
  prevCompany: string;

  @Column()
  startOfWork: string;

  @Column()
  endOfWork: string;

  @Column()
  profession: string;

  @Column()
  generalInfo: string;

  @Column()
  contacts: string;

  @Column()
  imgUrl: string;

  @ManyToOne(() => ApplicantProfile, (applicant) => applicant.resumes)
  applicant: ApplicantProfile;

  @ManyToMany(() => Vacancy)
  @JoinTable()
  vacancies: Vacancy[];
}
