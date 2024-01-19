import { Sequelize } from "sequelize";

const Coach = (sequelize) =>
  sequelize.define("coach", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    height: {
      type: Sequelize.STRING,
    },
    weight: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
  });

export default Coach
