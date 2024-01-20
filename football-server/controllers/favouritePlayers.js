import db from "../models/index.js";
import { buildBody } from "../utils/buildBody.js";
import { validationResult } from "express-validator";

const FavouritePlayer = db.favouritePlayers;
const Player = db.players;

//get all favourite players
export const getFavouritePlayers = (req, res) => {
  FavouritePlayer.findAll()
    .then((players) => {
      res.status(200).json({ favouritePlayers: players });
    })
    .catch((err) => res.status(500).json({ errors: err }));
};

//create a favourite player
export const createFavouritePlayer = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const isFavouritePlayerPopulated = await FavouritePlayer.findByPk(
      req.body.player_id,
    );
    const isPlayerPopulated = await Player.findByPk(req.body.player_id);
    if (isPlayerPopulated && !isFavouritePlayerPopulated) {
      FavouritePlayer.create({
        ...buildBody(req.body),
      })
        .then((result) => {
          console.log("Favourite Player Created");
          res.status(201).json({
            message: "Favourite Player created successfully!",
            coach: result,
          });
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    } else {
      if (!isPlayerPopulated) {
        return res
          .status(400)
          .json({ errors: "Player not exists with that ID." });
      }
      res
        .status(400)
        .json({ errors: "Favourite player already exists with that ID." });
    }
  } else {
    res.status(422).json({ errors: errors.array() });
  }
};

export const deleteFavouritePlayer = async (req, res) => {
  const playerId = req.params.playerId;
  FavouritePlayer.findByPk(playerId)
    .then((player) => {
      if (!player) {
        return res.status(404).json({ message: "Player not found!" });
      }
      FavouritePlayer.destroy({
        where: {
          player_id: playerId,
        },
      }).then(() => {
        res.status(200).json({ message: "Player deleted!" });
      });
    })
    .catch((err) => res.status(500).json({ errors: err }));
};
