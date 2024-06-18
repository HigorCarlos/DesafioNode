import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async create(data: any): Promise<UserEntity> {
        return this.userRepository.save(data);
    }

    async findOne(condition: any): Promise<UserEntity> {
        return this.userRepository.findOne(condition);
    }
}