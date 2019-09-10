
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN : '123456', Make: 'Toyota', Model: 'Land Cruiser', Mileage: 100500, Transmission: 'Automatic', Title: 'Clean'},
        {VIN : '234567', Make: 'Ford', Model: 'something', Mileage: 50000, Transmission: 'Automatic', Title: 'Clean'},
      ]);
    });
};
