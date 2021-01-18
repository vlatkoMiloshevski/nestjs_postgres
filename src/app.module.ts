import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonQueryBuilder } from './db/query-builder/person.qb';
import { ClientConnection } from './db/query-builder/schema.qb';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ClientConnection,
    PersonQueryBuilder,
  ],
})
export class AppModule { }
