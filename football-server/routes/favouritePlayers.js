import express from "express";
import { favouritePlayerValidator } from "../validators/index.js";
import {
  createFavouritePlayer,
  deleteFavouritePlayer,
  getFavouritePlayers,
} from "../controllers/favouritePlayers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favourite Players
 *   description: The Favourite Players managing API
 * /api/favourite-players:
 *   get:
 *     summary: Lists all the favourite players
 *     tags: [Favourite Players]
 *     responses:
 *       200:
 *         description: The list of the favourite players with their details
 *       500:
 *         description: Internal Server Error
 * /api/favourite-players/create:
 *   post:
 *     summary: Create a new Favourite Player
 *     tags: [Favourite Players]
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
 *     responses:
 *       201:
 *         description: The created Favourite Player
 *       400:
 *         description: Favourite Player already exists with that ID
 *       422:
 *         description: Validation errors
 *       500:
 *         description: Internal Server Error
 * /api/favourite-players/{playerId}:
 *   delete:
 *     summary: Remove the favourite player
 *     tags: [Favourite Players]
 *     parameters:
 *       - in: path
 *         name: playerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The player id
 *     responses:
 *       200:
 *         description: The list of the favourite players with their details
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getFavouritePlayers);
router.post("/create", favouritePlayerValidator, createFavouritePlayer);
router.delete("/:playerId", deleteFavouritePlayer);

export default router;
