import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Resume } from '../entity/Resume';

@Entity()
export class ApplicantProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  age: string;

  @Column()
  phone: string;

  @Column()
  imgUrl: string;

  @OneToMany(() => Resume, (resume) => resume.applicant, {
    cascade: true,
  })
  @JoinColumn()
  resumes: Resume[];
}
