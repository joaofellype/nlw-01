import path from 'path'
require('dotenv').config()
console.log(process.env.DB_HOST)
module.exports ={
    client:'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port:5432
      },
      migrations:{
          directory:path.resolve(__dirname,'src','database','migrations')
      },
      seeds:{
          directory:path.resolve(__dirname,'src','database','seeds')
      }
}