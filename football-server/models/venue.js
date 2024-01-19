import { Sequelize } from "sequelize";

const Venue = (sequelize) =>
  sequelize.define("venue", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    capacity: {
      type: Sequelize.INTEGER,
    },
    surface: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

export default Venue;
