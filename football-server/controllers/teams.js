import db from "../models/index.js";
import { buildBody } from "../utils/buildBody.js";
import { validationResult } from "express-validator";

const Team = db.teams;

//get all teams
export const getTeams = (req, res) => {
  Team.findAll({
    include: [
      {
        model: db.coaches,
      },
      {
        model: db.players,
      },
      {
        model: db.venues,
      },
    ],
  })
    .then((teams) => {
      res.status(200).json({ teams: teams });
    })
    .catch((err) => res.status(500).json({ errors: err }));
};

//create a team
export const createTeam = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const isTeamPopulated = await Team.findByPk(req.body.id);
    if (!isTeamPopulated) {
      Team.create({
        ...buildBody(req.body),
      })
        .then((result) => {
          console.log("Team Created");
          res.status(201).json({
            message: "Team created successfully!",
            team: result,
          });
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    } else {
      res.status(400).json({ errors: "Team already exists with that ID." });
    }
  } else {
    res.status(422).json({ errors: errors.array() });
  }
};

//get players by team id
export const getPlayersByTeamId = (req, res) => {
  const teamId = req.params.teamId;
  Team.findByPk(teamId)
    .then((team) => {
      if (!team) {
        return res.status(404).json({ message: "Team not found!" });
      }
      res.status(200).json({ players: team.players });
    })
    .catch((err) => res.status(500).json({ errors: err }));
};
