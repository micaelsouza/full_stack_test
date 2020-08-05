const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
