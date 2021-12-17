import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      /* store user information */
      .createTable('users', (table) => {
        table.increments('userId');
        table.text('image');
        table.text('name');
        table.text('username');
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
