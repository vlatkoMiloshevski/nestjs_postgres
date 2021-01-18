import { Module } from '@nestjs/common';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { PersonQueryBuilder } from './db/query-builder/person.qb';
import { ClientConnection } from './db/query-builder/schema.qb';
import { PhotoController } from './photo/photo.controller';
import { PhotoService } from './photo/photo.service';
import { PhotoQueryBuilder } from './db/query-builder/photo.qb';

@Module({
  imports: [],
  controllers: [
    PersonController,
    PhotoController,
  ],
  providers: [
    PersonService,
    PhotoService,
    ClientConnection,
    PersonQueryBuilder,
    PhotoQueryBuilder,
  ],
})
export class AppModule { }
