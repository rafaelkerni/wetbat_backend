import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  const table_name = 'clients';

  // Deletes ALL existing entries
  await knex('quotes').del();
  await knex(table_name).del();

  const clients_faker = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({
    id: i,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number('+## ## ### ## ##'),
  }));

  // Inserts seed entries
  await knex(table_name).insert(clients_faker);
}
