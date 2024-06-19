import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TagService } from '../services/tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

@Get()
async index() {
    return await this.tagService.findAll();
}

@Post()
async create(@Body() body) {
    return await this.tagService.create(body);
}

@Get(':id')
async show(@Param('id') id: string) {
    console.log(`Fetching tag with id: ${id}`);
    return await this.tagService.findOneById(id);
}

@Put(':id')
async update(@Param('id') id: string, @Body() body) {
    return await this.tagService.update(id, body);
}

@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
async destroy(@Param('id') id: string) {
    await this.tagService.deleteById(id);
}
}