<p align="center">
  <b>Vibrant Creator Backend API</b>
</p>

## Description

This will be the backend for the vibrant creator app.

## Initial set up for local dev
create a .env file with the values as seen in the example.env file

```bash
NODE_ENV=development
DB=postgres
DB_USERNAME=replace_me_with_the_db_username
DB_PASSWORD=replace_me_with_the_db_password
DB_HOST=replace_me_with_db_url
DB_PORT=5432
DB_DATABASE=replace_me_with_database_name
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# build the app
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
