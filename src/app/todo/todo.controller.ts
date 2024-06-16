import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

// Método para listar todos os itens
@Get()
async index() {
    return await this.todoService.findAll();
}

// Método para criar um novo item
@Post()
async create(@Body() body) {
    return await this.todoService.create(body);
}

// Método para listar um item específico pelo ID
@Get(':id')
async show(@Param('id') id: string) {
    console.log(`Fetching todo with id: ${id}`);  // Log para depuração
    return await this.todoService.findOneById(id);
}

// Método para atualizar um item específico pelo ID
@Put(':id')
async update(@Param('id') id: string, @Body() body) {
    return await this.todoService.update(id, body);
}

// Método para deletar um item específico pelo ID
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
async destroy(@Param('id') id: string) {
    await this.todoService.deleteById(id);
}
}
