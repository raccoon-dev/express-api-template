# Express API Template

Basic template to quickly start API application with Node and Express.

## Content

 * anthorization with "api-key" header
 * logging with Winston
 * SQLite database
 * migrations

## Installation

1. Copy or rename `env` file to `.env`
2. Edit `.env` file
3. `npm install -g knex`
4. `npm install`
5. `knex migrate:latest`
6. `npm run dev` or `npm run prod` or `node index`
