import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

@Get()
async index() {
    return await this.todoService.findAll();
}

@Post()
async create(@Body() body) {
    return await this.todoService.create(body);
}

@Get(':id')
async show(@Param('id') id: string) {
    console.log(`Fetching todo with id: ${id}`);
    return await this.todoService.findOneById(id);
}

@Put(':id')
async update(@Param('id') id: string, @Body() body) {
    return await this.todoService.update(id, body);
}

@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
async destroy(@Param('id') id: string) {
    await this.todoService.deleteById(id);
}
}
