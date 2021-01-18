import { Test, TestingModule } from '@nestjs/testing';
import { NewPerson, Person } from '../db/model/person.db';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

describe('AppController', () => {
  let personController: PersonController;
  let person: Person;
  let newPerson: NewPerson;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService],
    }).compile();

    personController = app.get<PersonController>(PersonController);
    person = { address: '', city: '', firstname: '', lastname: '', personid: 1, num_of_photos: 0};
    newPerson = { address: '', city: '', firstname: '', lastname: '', };
  });

  describe('root', () => {
    it('should create', () => {
      expect(personController.createPerson(newPerson)).toHaveBeenCalled();
    });
    it('should update', () => {
      expect(personController.updatePerson(person)).toHaveBeenCalled();
    });
    it('should delete', () => {
      expect(personController.deletePerson(person)).toHaveBeenCalled();
    });
    it('should getPersonById', () => {
      expect(personController.getPersonById(person.personid)).toHaveBeenCalled();
    });
    it('should getPersons', () => {
      expect(personController.getPersons()).toHaveBeenCalled();
    });
  });
});
