const { fake } = require('faker/locale/pt_BR');

// Lista de usuários fake apenas para preencher o banco para testes
const demoUsers = Array(60)
  .fill({})
  .map(() => ({
    name: fake('{{name.firstName}} {{name.lastName}}'),
    email: fake('{{internet.email}}').toLowerCase(),
    phonenumber: fake('{{phone.phoneNumberFormat}}'),
    cpf: new Array(11)
      .fill(0)
      .map(() => Math.round(Math.random() * 9))
      .join(''),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', demoUsers, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
