import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { NewPerson, Person } from './db/model/person.db';

@Controller('person')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getPersons(): any {
    return this.appService.getPersons();
  }

  @Get(':personid')
  getPersonById(@Param('personid') personid): any {
    return this.appService.getPersonById(personid);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createPerson(@Body() person: NewPerson): any {
    return this.appService.createPerson(person);
  }

  @Put()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePerson(@Body() person: Person): any {
    return this.appService.updatePerson(person);
  }

  @Delete(':personid')
  deletePerson(@Param('personid') personid): any {
    return this.appService.deletePerson(personid);
  }

}
