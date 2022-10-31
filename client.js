import * as dotenv from 'dotenv'
dotenv.config()
console.log(process.env)
import pg from 'pg'
const {Pool} = pg


const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DATABASE_SERVER,
    database: process.env.MYDB,
    password: process.env.SECRET_PASSWORD,
})

export default pool;