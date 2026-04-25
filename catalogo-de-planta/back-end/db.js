import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: 'localhost',
  database: process.env.DATABASE || 'catalogo_plantas',
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
});

console.log("banco veio do " + (process.env.DB_USER ? '.env' : "default"))

export default {
  query: (text, params) => pool.query(text, params),
};
