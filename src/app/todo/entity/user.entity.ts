import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({unique: true})
    email: string; 

    @Column()
    password: string;
}