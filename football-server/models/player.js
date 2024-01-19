import { Sequelize } from "sequelize";

const Player = (sequelize) =>
  sequelize.define("player", {
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
    injured: {
      type: Sequelize.BOOLEAN,
    },
    photo: {
      type: Sequelize.STRING,
    },
  });

export default Player;
