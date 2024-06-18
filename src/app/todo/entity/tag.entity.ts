import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity({ name: 'tags'})
export class TagEntity {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    color: string;

    @CreateDateColumn({ name: 'created_at' })
    createAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updateAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deleteAt: string;

    @ManyToOne(() => TodoEntity, (todoentity) => todoentity.tagentity)
TodoEntity: TodoEntity
}