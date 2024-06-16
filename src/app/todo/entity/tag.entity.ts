import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
} 