require('dotenv/config'); // load everything from `.env` file into the `process.env` variable
// const path = require('path')

const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

module.exports = [
  {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    entities: ['./dist/**/*.entity.js'], // requires npm run build first
    // entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    logging: true,
    subscribers: [
      './dist/subscribers/*-subscriber.js',
    ] /*,
  migrations: [
    "src/migrations/*.ts"
  ] */,
  },
];
