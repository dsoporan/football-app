import { Sequelize } from "sequelize";

const FavouritePlayer = (sequelize) =>
  sequelize.define("favouritePlayer", {
    player_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

export default FavouritePlayer;
