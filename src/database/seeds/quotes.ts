import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export async function seed(knex: Knex): Promise<void> {
  const table_name = 'quotes';

  // Deletes ALL existing entries
  await knex(table_name).del();

  const quotes_faker = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
    const departure_date = faker.date.future();
    return {
      id: i,
      client_id: i,
      status: faker.helpers.arrayElement([
        'pending',
        'approved',
        'rejected',
      ]),
      departure: faker.airline.airport().name,
      departure_date,
      destination: faker.airline.airport().name,
      return_date: faker.date.between({
        from: departure_date,
        to: dayjs(departure_date).add(1, 'month').format(),
      }),
      travellers: faker.number.int({ min: 1, max: 4 }),
      transportation: faker.helpers.arrayElement([
        'rental_car',
        'ridesharing',
        'bus_train',
        'other',
        'none',
      ]),
      value: faker.commerce.price({ min: 500, max: 10000, dec: 2 }),
      send_email: faker.datatype.boolean(),
    };
  });

  // Inserts seed entries
  await knex(table_name).insert(quotes_faker);
}
