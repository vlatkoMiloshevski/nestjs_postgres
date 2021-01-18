import { Injectable } from '@nestjs/common';
import { NewPerson, Person } from 'src/db/model/person.db';
import { ClientConnection } from './schema.qb';

@Injectable()
export class PersonQueryBuilder {
    constructor(
        private readonly clientConnection: ClientConnection,
    ) {
    }

    public async getPersons(): Promise<Person[] | Error> {
        const client = await this.clientConnection.getPool().connect();
        const clientQuery = await client.query('SELECT * FROM persons ORDER BY personid ASC');
        client.end();
        return clientQuery.rows;
    }

    public async getPersonById(personid: string): Promise<Person | Error> {
        const client = await this.clientConnection.getPool().connect();
        const clientQuery = await client.query('SELECT * FROM persons WHERE personid = $1', [personid]);
        client.end();
        return clientQuery.rows[0];
    }

    public async updatePerson(person: Person): Promise<boolean | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('UPDATE persons SET lastname = $1, firstname = $2, address = $3, city = $4 WHERE personid = $5',
            [person.lastname, person.firstname, person.address, person.city, person.personid]);
        client.end();
        return true;
    }

    public async createPerson(person: NewPerson): Promise<boolean | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('INSERT INTO persons (lastname, firstname, address, city) VALUES ($1, $2, $3, $4)',
            [person.lastname, person.firstname, person.address, person.city]);
        client.end();
        return true;
    }

    public async deletePerson(personid: string): Promise<boolean | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('DELETE FROM persons WHERE personid = $1', [personid]);
        client.end();
        return true;
    }

}
