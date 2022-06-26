import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
