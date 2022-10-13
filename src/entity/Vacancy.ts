import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { Resume } from '../entity/Resume';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  salary: number;

  @Column()
  reqExperience: string;

  @Column()
  schedule: string;

  @Column()
  city: string;

  @Column()
  generalInfo: string;

  @Column()
  contacts: string;
}
