import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { UserEntity } from "../entity/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    findOneById(id: string) {
        throw new Error("Method not implemented.");
    }
    get<T>(arg: string): string | Buffer {
      throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async create(data: any): Promise<UserEntity> {
        return this.userRepository.save(data);
    }

    async findOne(condition: any): Promise<UserEntity> {
        return this.userRepository.findOne(condition);
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async login(userEntity: any) {
        const payload = { email: userEntity.email, sub: userEntity.email };
        return {
          access_token: this.jwtService.sign(payload), 
        };
}

}