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
      /* comments and replays of productRequests */
      .createTable('comments', (table) => {
        table.increments('commentsId');
        table
          .integer('productRequestsId')
          .unsigned()
          .references('productRequests.ProductRequestsId')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
        table.text('content');
        table.text('replyingTo');
        table
          .integer('userId')
          .unsigned()
          .references('users.userId')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users')
    .dropTable('productRequests')
    .dropTable('comments');
}
