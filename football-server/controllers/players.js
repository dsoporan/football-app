import db from "../models/index.js";
import { buildBody } from "../utils/buildBody.js";
import { validationResult } from "express-validator";

const Player = db.players;

//get all players
export const getPlayers = (req, res) => {
  Player.findAll({
    include: [
      {
        model: db.teams,
      },
    ],
  })
    .then((players) => {
      res.status(200).json({ players: players });
    })
    .catch((err) => res.status(500).json({ errors: err }));
};

//create a player
export const createPlayer = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const isPlayerPopulated = await Player.findByPk(req.body.id);
    if (!isPlayerPopulated) {
      Player.create({
        ...buildBody(req.body),
      })
        .then((result) => {
          console.log("Player Created");
          res.status(201).json({
            message: "Player created successfully!",
            player: result,
          });
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    } else {
      res.status(400).json({ errors: "Player already exists with that ID." });
    }
  } else {
    res.status(422).json({ errors: errors.array() });
  }
};
