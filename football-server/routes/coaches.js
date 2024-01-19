import { getCoaches, createCoach } from "../controllers/coaches.js";
import express from "express";
import { coachValidator } from "../validators/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Coaches
 *   description: The coaches managing API
 * /api/coaches:
 *   get:
 *     summary: Lists all the coaches
 *     tags: [Coaches]
 *     responses:
 *       200:
 *         description: The list of the coaches with their details
 *       500:
 *         description: Internal Server Error
 * /api/coaches/create:
 *   post:
 *     summary: Create a new Coach
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The coach ID.
 *                   example: 123
 *                 name:
 *                   type: string
 *                   description: The coach's name.
 *                   example: T. Tuchel
 *                 firstname:
 *                   type: string
 *                   description: The coach's firstname.
 *                   example: Thomas
 *                 lastname:
 *                   type: string
 *                   description: The coach's lastname.
 *                   example: Tuchel
 *                 age:
 *                   type: integer
 *                   description: The coach age.
 *                   example: 53
 *                 nationality:
 *                   type: string
 *                   description: The coach's nationality.
 *                   example: Germany
 *                 height:
 *                   type: string
 *                   description: The coach's height.
 *                   example: 192 cm
 *                 weight:
 *                   type: string
 *                   description: The coach's weight.
 *                   example: 85 kg
 *                 photo:
 *                   type: string
 *                   description: The coach's weight.
 *                   example: https://media.api-sports.io/football/coachs/40.png
 *     responses:
 *       201:
 *         description: The created Coach
 *       400:
 *         description: Coach already exists with that ID
 *       422:
 *         description: Validation errors
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getCoaches);
router.post("/create", coachValidator, createCoach);

export default router;
