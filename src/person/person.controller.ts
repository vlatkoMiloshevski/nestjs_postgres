import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewPerson } from 'src/db/model/person.db';
import { PersonDTO } from 'src/dto/person.dto';
import { PersonService } from './person.service';

@Controller('persons')
export class PersonController {
  constructor(private readonly appService: PersonService) { }

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
  updatePerson(@Body() person: PersonDTO): any {
    return this.appService.updatePerson(person);
  }

  @Delete(':personid')
  deletePerson(@Param('personid') personid): any {
    return this.appService.deletePerson(personid);
  }

}
