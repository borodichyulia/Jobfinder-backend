import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('boolean', { default: false })
  isActivated: boolean;

  @Column()
  activationLink: string;
}
