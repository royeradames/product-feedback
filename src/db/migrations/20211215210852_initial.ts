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
      /*  Track of of a project suggestions and planned, in-progress, and live featueres */
      .createTable('productRequests', (table) => {
        table.increments('productRequestsId');
        table.text('title');
        table.text('category');
        table.integer('upvotes');
        table.text('status');
        table.text('description');
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users').dropTable('productRequests');
}
