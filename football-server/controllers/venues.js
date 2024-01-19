import db from "../models/index.js";
import { buildBody } from "../utils/buildBody.js";
import { validationResult } from "express-validator";

const Venue = db.venues;

//get all venues
export const getVenues = (req, res) => {
  Venue.findAll()
    .then((venues) => {
      res.status(200).json({ venues: venues });
    })
    .catch((err) => res.status(500).json({ errors: err }));
};

//create a venue
export const createVenue = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const isVenuePopulated = await Venue.findByPk(req.body.id);
    if (!isVenuePopulated) {
      Venue.create({
        ...buildBody(req.body),
      })
        .then((result) => {
          console.log("Venue Created");
          res.status(201).json({
            message: "Venue created successfully!",
            venue: result,
          });
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    } else {
      res.status(400).json({ errors: "Venue already exists with that ID." });
    }
  } else {
    res.status(422).json({ errors: errors.array() });
  }
};
