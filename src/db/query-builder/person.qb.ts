import { Injectable } from '@nestjs/common';
import { NewPerson, Person } from '../model/person.db';
import { ClientConnection } from './schema.qb';

@Injectable()
export class PersonQueryBuilder {
    constructor(
        private readonly clientConnection: ClientConnection,
    ) {
    }

    public async getPersons(): Promise<Person[] | Error> {
        const client = await this.clientConnection.getPool().connect();
        const clientQuery = await client.query('SELECT personid, lastname, firstname, city, address, (SELECT count(*) as num_of_photos FROM photos WHERE photos.personid = persons.personid) FROM persons ORDER BY personid ASC');
        client.end();
        return clientQuery.rows;
    }

    public async getPersonById(personid: string): Promise<Person | Error> {
        const client = await this.clientConnection.getPool().connect();
        const clientQueryPerson = await client.query('SELECT * FROM persons WHERE personid = $1', [personid]);
        const clientQueryPhoto = await client.query('SELECT * FROM photos WHERE personid = $1', [personid]);
        client.end();
        clientQueryPerson.rows[0].photoList = clientQueryPhoto.rows;
        return clientQueryPerson.rows[0];
    }

    public async updatePerson(person: Person): Promise<any | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('UPDATE persons SET lastname = $1, firstname = $2, address = $3, city = $4 WHERE personid = $5',
            [person.lastname, person.firstname, person.address, person.city, person.personid]);
        client.end();
        return true;
    }

    public async createPerson(person: NewPerson): Promise<any | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('INSERT INTO persons (lastname, firstname, address, city) VALUES ($1, $2, $3, $4)',
            [person.lastname, person.firstname, person.address, person.city]);
        client.end();
    }

    public async deletePerson(personid: string): Promise<any | Error> {
        const client = await this.clientConnection.getPool().connect();
        try {
            client.query('BEGIN');
            await client.query('DELETE FROM photos WHERE personid = $1', [personid]);
            await client.query('DELETE FROM persons WHERE personid = $1', [personid]);
            client.query('COMMIT');
        }
        catch (error) {
            console.log(error);
            client.query('ROLLBACK');
        } finally {
            client.release();
        }
    }

}
