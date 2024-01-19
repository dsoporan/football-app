import db from "../models/index.js";
import { buildBody } from "../utils/buildBody.js";
import { validationResult } from "express-validator";

const Coach = db.coaches;

export const getCoaches = (req, res) => {
  Coach.findAll()
    .then((coaches) => {
      res.status(200).json({ coaches: coaches });
    })
    .catch((err) => res.status(500).json({ errors: err }));
};

//create a coach
export const createCoach = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const isCoachPopulated = await Coach.findByPk(req.body.id);
    if (!isCoachPopulated) {
      Coach.create({
        ...buildBody(req.body),
      })
        .then((result) => {
          console.log("Coach Created");
          res.status(201).json({
            message: "Coach created successfully!",
            coach: result,
          });
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    } else {
      res.status(400).json({ errors: "Coach already exists with that ID." });
    }
  } else {
    res.status(422).json({ errors: errors.array() });
  }
};
