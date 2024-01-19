import { Sequelize } from "sequelize";

const Team = (sequelize) =>
  sequelize.define("team", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    founded: {
      type: Sequelize.INTEGER,
    },
    national: {
      type: Sequelize.BOOLEAN,
    },
    logo: {
      type: Sequelize.STRING,
    },
  });

export default Team;

