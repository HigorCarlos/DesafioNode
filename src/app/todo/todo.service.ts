import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
    deleteTodo(id: string) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>
    ) {}

    async findAll() {
        return await this.todoRepository.find();
    }

    async findOneById(id) {
        try {
           // console.log(`Select * From  todo with id: ${id}`); 
            return await this.todoRepository.findOneBy({id});
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data) {
        return await this.todoRepository.save(this.todoRepository.create(data));
    }

    async update(id: string, data) {
        const todo = await this.findOneById(id);

        this.todoRepository.merge(todo, data);
        return await this.todoRepository.save(todo);
    }
 
    async deleteById(id: string) {
        await this.findOneById(id);
        await this.todoRepository.softDelete({id});
    }
}