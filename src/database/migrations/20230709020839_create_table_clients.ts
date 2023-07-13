import { Knex } from 'knex';

const name = 'clients';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(name, table => {
    table.increments('id').primary();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(name);
}
