import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Post()
  post() {
    return 'create a song endpoint';
  }

  @Get()
  findAll() {
    return 'find all songs endpoints';
  }
  @Get(':id')
  findOne() {
    return 'fetch song based on id';
  }

  @Put(':id')
  update() {
    return 'update song based on id';
  }

  @Delete(':id')
  delete() {
    return 'delete song based on id';
  }
}
