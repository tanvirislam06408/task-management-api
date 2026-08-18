import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dtp';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDTO) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    try {
      throw new Error('error in db record');
      return this.songsService.findAll();
    } catch (err) {
      throw new HttpException(
        'server error ha ha ha',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
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
