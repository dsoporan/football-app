import { body } from "express-validator";

export const teamValidator = [
  body("id", "ID shouldn't be empty").not().isEmpty(),
  body("id", "Invalid ID, must be alphanumeric").isAlphanumeric(),
  body("founded", "Invalid founded, must be alphanumeric").isAlphanumeric(),
  body("name", "Invalid name, must be string").isString(),
  body("country", "Invalid country, must be string").isString(),
  body("logo", "Invalid logo, must be string").isString(),
  body("national", "Invalid national, must be boolean").isBoolean(),
  body("code", "The code should be exactly 3 characters").isLength({
    min: 3,
    max: 3,
  }),
];

export const venueValidator = [
  body("id", "ID shouldn't be empty").not().isEmpty(),
  body("id", "Invalid ID, must be alphanumeric").isAlphanumeric(),
  body("name", "Invalid name, must be string").isString(),
  body("address", "Invalid address, must be string").isString(),
  body("city", "Invalid city, must be string").isString(),
  body("capacity", "Invalid capacity, must be alphanumeric").isAlphanumeric(),
  body("surface", "Invalid surface, must be string").isString(),
  body("image", "Invalid image, must be string").isString(),
];

export const coachValidator = [
  body("id", "ID shouldn't be empty").not().isEmpty(),
  body("id", "Invalid ID, must be alphanumeric").isAlphanumeric(),
  body("name", "Invalid name, must be string").isString(),
  body("firstname", "Invalid firstname, must be string").isString(),
  body("lastname", "Invalid lastname, must be string").isString(),
  body("nationality", "Invalid nationality, must be string").isString(),
  body("height", "Invalid height, must be string").isString(),
  body("weight", "Invalid weight, must be string").isString(),
  body("age", "Invalid age, must be alphanumeric").isAlphanumeric(),
  body("photo", "Invalid photo, must be string").isString(),
];

export const playerValidator = [
  body("id", "ID shouldn't be empty").not().isEmpty(),
  body("id", "Invalid ID, must be alphanumeric").isAlphanumeric(),
  body("name", "Invalid name, must be string").isString(),
  body("firstname", "Invalid firstname, must be string").isString(),
  body("lastname", "Invalid lastname, must be string").isString(),
  body("nationality", "Invalid nationality, must be string").isString(),
  body("height", "Invalid height, must be string").isString(),
  body("weight", "Invalid weight, must be string").isString(),
  body("age", "Invalid age, must be alphanumeric").isAlphanumeric(),
  body("photo", "Invalid photo, must be string").isString(),
  body("injured", "Invalid injured, must be boolean").isBoolean(),
];

export const favouritePlayerValidator = [
  body("player_id", "Player ID shouldn't be empty").not().isEmpty(),
  body("player_id", "Invalid Player ID, must be alphanumeric").isAlphanumeric(),
];
