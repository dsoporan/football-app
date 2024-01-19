import { getPlayers, createPlayer } from "../controllers/players.js";
import express from "express";
import { playerValidator } from "../validators/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: The players managing API
 * /api/players:
 *   get:
 *     summary: Lists all the players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: The list of the players with their details
 *       500:
 *         description: Internal Server Error
 * /api/players/create:
 *   post:
 *     summary: Create a new Player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The player ID.
 *                   example: 123
 *                 name:
 *                   type: string
 *                   description: The player's name.
 *                   example: Neymar
 *                 firstname:
 *                   type: string
 *                   description: The player's firstname.
 *                   example: Neymar
 *                 lastname:
 *                   type: string
 *                   description: The player's lastname.
 *                   example: da Silva Santos Júnior
 *                 age:
 *                   type: integer
 *                   description: The player age.
 *                   example: 23
 *                 nationality:
 *                   type: string
 *                   description: The player's nationality.
 *                   example: Brazil
 *                 height:
 *                   type: string
 *                   description: The player's height.
 *                   example: 172 cm
 *                 weight:
 *                   type: string
 *                   description: The player's weight.
 *                   example: 68 kg
 *                 injured:
 *                   type: boolean
 *                   description: The player is injured.
 *                   example: false
 *                 photo:
 *                   type: string
 *                   description: The coach's weight.
 *                   example: https://media.api-sports.io/football/players/276.png
 *     responses:
 *       201:
 *         description: The created Venue
 *       400:
 *         description: Player already exists with that ID
 *       422:
 *         description: Validation errors
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getPlayers);
router.post("/create", playerValidator, createPlayer);

export default router;
