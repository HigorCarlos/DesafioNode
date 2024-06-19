import { BadRequestException, Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UserService } from "../services/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import {Response} from 'express';

@Controller('user')
export class UserController{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {       
    }
    //Registrar novo usuario
    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);

        return this.userService.create({
            name,
            email,
            password: hashedPassword,
        });
    }
    //Validar email e senha do usuario
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const userEntity = await this.userService.findOne({ where: {email} });

        if(!userEntity) {
            throw new BadRequestException('invalid credentials');
        }

        if(!await bcrypt.compare(password, userEntity.password)){
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: userEntity.id});

        response.cookie('jwt', jwt, {httpOnly: true});

        return {
            message: 'success'
        };
    }

    async user() {

    }

    //Listar os usuarios cadastrados
    @Get('list')
    async index() {
        return await this.userService.findAll();
}

    //Desconectar usuario ativo
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'sucess'
        }
    }

}