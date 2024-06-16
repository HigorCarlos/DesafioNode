import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'todos'})
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({name: 'task_title'})
    taskTitle: string;

    @Column()
    status: boolean;

    @Column()
    description: string;

    @Column({ width: 10 })
    priority: number;

    @CreateDateColumn({ name: 'created_at' })
    createAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updateAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deleteAt: string;
}