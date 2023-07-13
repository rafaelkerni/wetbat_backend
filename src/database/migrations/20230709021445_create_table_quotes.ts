import { Knex } from 'knex';

const name = 'quotes';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(name, table => {
    table.increments('id').primary();
    table
      .integer('client_id')
      .unsigned()
      .references('id')
      .inTable('clients')
      .notNullable();
    table.string('status').notNullable();
    table.string('departure').notNullable();
    table.timestamp('departure_date').defaultTo(knex.fn.now());
    table.string('destination').notNullable();
    table.timestamp('return_date').defaultTo(knex.fn.now());
    table.integer('travellers').notNullable();
    table.string('transportation').notNullable();
    table.decimal('value', 15, 2).notNullable();
    table.boolean('send_email').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(name);
}
