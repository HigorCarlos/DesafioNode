import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){       
    }

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
            password: hashedPassword
        });
    }
}