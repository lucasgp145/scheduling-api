module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('procedures', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      procedure_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      types_of_service: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('procedures');
  },
};
