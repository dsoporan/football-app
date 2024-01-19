import {
  getTeams,
  createTeam,
  getPlayersByTeamId,
} from "../controllers/teams.js";
import express from "express";
import { teamValidator } from "../validators/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: The Teams managing API
 * /api/teams:
 *   get:
 *     summary: Lists all the teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: The list of the teams with their details
 *       500:
 *         description: Internal Server Error
 * /api/teams/create:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The team's ID.
 *                   example: 123
 *                 name:
 *                   type: string
 *                   description: The team's name.
 *                   example: Atletico Madrid
 *                 code:
 *                   type: string
 *                   description: The team's code.
 *                   example: MAD
 *                 country:
 *                   type: string
 *                   description: The team's country.
 *                   example: Spain
 *                 founded:
 *                   type: integer
 *                   description: The team's foundation year.
 *                   example: 1903
 *                 national:
 *                   type: boolean
 *                   description: The team is national.
 *                   example: false
 *                 logo:
 *                   type: string
 *                   description: The team's logo.
 *                   example: https://media.api-sports.io/football/teams/530.png
 *     responses:
 *       201:
 *         description: The created team
 *       400:
 *         description: Team already exists with that ID
 *       422:
 *         description: Validation errors
 *       500:
 *         description: Internal Server Error
 * /api/teams/{teamId}/players:
 *   get:
 *     summary: Get all the players from a team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The team id
 *     responses:
 *       200:
 *         description: The list of the players of the team specified with their details
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getTeams);
router.post("/create", teamValidator, createTeam);
router.get("/:teamId/players", getPlayersByTeamId);

export default router;
