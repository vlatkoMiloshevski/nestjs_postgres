import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewPhoto, Photo } from 'src/db/model/photo.db';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private readonly appService: PhotoService) { }

  @Get()
  getPhotos(): any {
    return this.appService.getPhotos();
  }

  @Get('person/:personid')
  getPhotosByPersonId(@Param('personid') personid): any {
    return this.appService.getPhotosByPersonId(personid);
  }

  @Get(':photoid/person/:personid')
  getPhotoById(
    @Param('photoid') photoid, 
    @Param('personid') personid,
    ): any {
    return this.appService.getPhotoById(photoid, personid);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createPhoto(@Body() photo: NewPhoto): any {
    return this.appService.createPhoto(photo);
  }

  @Put()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePhoto(@Body() photo: Photo): any {
    return this.appService.updatePhoto(photo);
  }

  @Delete(':photoid')
  deletePhoto(@Param('photoid') photoid): any {
    return this.appService.deletePhoto(photoid);
  }

}
