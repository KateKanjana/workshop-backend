'use strict';

const tableProductName = 'products';

function getCommonFieldsWhenCreate(Sequelize) {
  return {
    status: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'active',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  };
}


async function createProductTable(queryInterface, Sequelize) {
  await queryInterface.createTable(tableProductName, {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DataTypes.DOUBLE,
      allowNull: true,
    },
    ...getCommonFieldsWhenCreate(Sequelize),
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await createProductTable(queryInterface, Sequelize);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(tableProductName);
  },
};
