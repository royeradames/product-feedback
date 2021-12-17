/* initialize knex in the current enviroment */
import knex from 'knex';
import knexConfig from '../../knexfile';

const enviroment = process.env.DB_ENV || 'development';

export default knex(knexConfig[enviroment]);
