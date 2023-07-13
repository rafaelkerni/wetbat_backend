const Models = (knex: any) => {
  const bookshelf = require('bookshelf')(knex);

  bookshelf.plugin(require('bookshelf-cascade-delete'));

  const Clients = bookshelf.Model.extend(
    {
      tableName: 'clients',
      quotes: function () {
        return this.hasMany(Quotes, 'id', 'client_id');
      },
    },
    {
      dependents: ['quotes'],
    }
  );

  const Quotes = bookshelf.Model.extend({
    tableName: 'quotes',
    client: function () {
      return this.hasOne(Clients, 'id', 'client_id');
    },
  });

  return { Clients, Quotes };
};

export default Models;
