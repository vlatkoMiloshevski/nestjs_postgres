import { Injectable } from '@nestjs/common';
import { NewPerson, Person } from '../db/model/person.db';
import { PersonQueryBuilder } from '../db/query-builder/person.qb';

@Injectable()
export class PersonService {
  constructor(
    private readonly personQueryBuilder: PersonQueryBuilder
  ) {

  }

  getPersons(): Promise<Person[] | Error> {
    return this.personQueryBuilder.getPersons()
      .then(res => res)
      .catch((err) => { throw err });
  }

  getPersonById(personid): Promise<Person | Error> {
    return this.personQueryBuilder.getPersonById(personid)
      .then(res => res)
      .catch((err) => { throw err });
  }

  updatePerson(personid): Promise<boolean | Error> {
    return this.personQueryBuilder.updatePerson(personid)
      .then(() => true)
      .catch((err) => { throw err });
  }

  createPerson(person: NewPerson): Promise<boolean | Error> {
    return this.personQueryBuilder.createPerson(person)
      .then(() => true)
      .catch((err) => { throw err });
  }

  deletePerson(personid): Promise<boolean | Error> {
    return this.personQueryBuilder.deletePerson(personid)
      .then(() => true)
      .catch((err) => { throw err });
  }
}
