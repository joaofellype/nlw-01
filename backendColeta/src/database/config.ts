import knex from 'knex'
require('dotenv').config()
console.log(process.env.DB_HOST)
const connection  = knex({
    client:'pg',
    connection: {
      host: 'localhost',
        user: 'postgres',
        password:'123456',
        database: 'coleta',
        port:5432
      }
})

export default connection;