import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Resume {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    secondName: string
    
    @Column()
    dateOfBirth: string

    @Column()
    gender: string

    @Column()
    email: string
    
    @Column()
    country: string
    
    @Column()
    placeOfEducation: string
    
    @Column()
    periodOfEducation: string

    @Column()
    specialization: string

    @Column()
    prevCompany: string

    @Column()
    periodOfWork: string

    @Column()
    profession: string

    @Column()
    generalInfo: string
    
    @Column()
    contacts: string 

}
