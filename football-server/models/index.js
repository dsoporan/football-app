import { Sequelize } from "sequelize";
import "dotenv/config";
import Team from "./team.js";
import Coach from "./coach.js";
import Venue from "./venue.js";
import Player from "./player.js";
import { populateTeamsWithVenues } from "../scripts/populateTeams.js";
import { populatePlayers } from "../scripts/populatePlayers.js";
import { populateCoaches } from "../scripts/populateCoaches.js";
import FavouritePlayer from "./favouritePlayer.js";

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.teams = Team(sequelize);
db.coaches = Coach(sequelize);
db.players = Player(sequelize);
db.venues = Venue(sequelize);
db.favouritePlayers = FavouritePlayer(sequelize);

db.sequelize
  .sync({ force: process.env.POPULATE_DB === "true" })
  .then(() => {
    console.log("DB synced");
  })
  .catch((err) => {
    console.log(err);
  });

db.teams.hasMany(db.players, {
  foreignKey: "team_players",
});
db.players.belongsTo(db.teams, {
  foreignKey: "team_players",
});

db.teams.hasMany(db.coaches, {
  foreignKey: "team_coaches",
});
db.coaches.belongsTo(db.teams, {
  foreignKey: "team_coaches",
});

db.teams.hasOne(db.venues, {
  foreignKey: "team_venue",
});
db.venues.belongsTo(db.teams, {
  foreignKey: "team_venue",
});

db.favouritePlayers.belongsTo(db.players, {
  foreignKey: "player_id",
});

if (process.env.POPULATE_DB === "true") {
  await populateTeamsWithVenues(db);
  await populatePlayers(db);
  await populateCoaches(db);
}

export default db;
