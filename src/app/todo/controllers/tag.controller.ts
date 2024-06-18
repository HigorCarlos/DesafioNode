import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TagService } from '../services/tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

// Método para listar todas as tag
@Get()
async index() {
    return await this.tagService.findAll();
}

// Método para criar uma nova tag
@Post()
async create(@Body() body) {
    return await this.tagService.create(body);
}

// Método para listar uma tag específico pelo ID
@Get(':id')
async show(@Param('id') id: string) {
    console.log(`Fetching tag with id: ${id}`);  // Log para depuração
    return await this.tagService.findOneById(id);
}

// Método para atualizar uma tag específica pelo ID
@Put(':id')
async update(@Param('id') id: string, @Body() body) {
    return await this.tagService.update(id, body);
}

// Método para deletar uma tag específico pelo ID
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
async destroy(@Param('id') id: string) {
    await this.tagService.deleteById(id);
}
}