import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from '../entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
    deleteTag(id: string) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
    ) {}

    async findAll() {
        return await this.tagRepository.find();
    }

    async findOneById(id) {
        try {
            return await this.tagRepository.findOneBy({id});
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data) {
        return await this.tagRepository.save(this.tagRepository.create(data));
    }

    async update(id: string, data) {
        const tag = await this.findOneById(id);

        this.tagRepository.merge(tag, data);
        return await this.tagRepository.save(tag);
    }
 
    async deleteById(id: string) {
        await this.findOneById(id);
        await this.tagRepository.softDelete({id});
    }
}