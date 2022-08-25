'use strict';
const tableProductName = 'products';

async function seedProducts(queryInterface) {
  await queryInterface.bulkInsert(
    tableProductName,
    [
      {
        name: 'product 1',
        price: 200
      },
      {
        name: 'product 2',
        price: 300
      },
    ],
    {},
  );
}

module.exports = {
  async up(queryInterface) {
    await seedProducts(queryInterface);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(tableProductName, null, {});
  },
};
