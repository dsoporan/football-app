import { getVenues, createVenue } from "../controllers/venues.js";
import express from "express";
import { venueValidator } from "../validators/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: The venues managing API
 * /api/venues:
 *   get:
 *     summary: Lists all the venues
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: The list of the venues with their details
 *       500:
 *         description: Internal Server Error
 * /api/venues/create:
 *   post:
 *     summary: Create a new Venue
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The venue's ID.
 *                   example: 123
 *                 name:
 *                   type: string
 *                   description: Santiago Bernabeu.
 *                   example: T. Tuchel
 *                 address:
 *                   type: string
 *                   description: The venue's address.
 *                   example: Spain
 *                 city:
 *                   type: string
 *                   description: The venue's city.
 *                   example: Madrid
 *                 capacity:
 *                   type: integer
 *                   description: The venue's capacity.
 *                   example: 80000
 *                 surface:
 *                   type: string
 *                   description: The venue's surface.
 *                   example: grass
 *                 image:
 *                   type: string
 *                   description: The venue's image.
 *                   example: https://media.api-sports.io/football/venues/19217.png
 *     responses:
 *       201:
 *         description: The created Venue
 *       400:
 *         description: Venue already exists with that ID
 *       422:
 *         description: Validation errors
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getVenues);
router.post("/create", venueValidator, createVenue);

export default router;
