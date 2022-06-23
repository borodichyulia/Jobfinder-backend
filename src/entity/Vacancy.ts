import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Vacancy {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    salary: number
    
    @Column()
    reqExperience: string

    @Column({"type": Date})
    schedule: string

    @Column()
    city: string
    
    @Column()
    generalInfo: string
    
    @Column()
    contacts: string

    
}