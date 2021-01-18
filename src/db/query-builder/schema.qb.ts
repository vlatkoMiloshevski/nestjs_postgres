import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ClientConnection {
    private pool;

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'node_db',
            password: 'postgres',
            port: '5432',
        });

        this.pool.connect((err, client, done) => {
            if (err) throw err
            client.query(`CREATE TABLE IF NOT EXISTS Persons 
            (
                PersonID SERIAL PRIMARY KEY, 
                LastName varchar(255), 
                FirstName varchar(255), 
                Address varchar(255), 
                City varchar(255)
            );

            CREATE TABLE IF NOT EXISTS Photos 
            (
                PhotoID SERIAL PRIMARY KEY,
                Description varchar(255),
                PersonID integer not null references persons(PersonID)
            );`, (err) => {
                done();
                console.log(err ? err : 'db server is up and running');
            })
        });

        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        })
    }

    getPool() {
        return this.pool;
    }
}
