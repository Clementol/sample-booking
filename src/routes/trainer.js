import { Router } from "express";
import { courseTrainers } from "../controllers/trainer";

const trainerRouter = Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Trainer:
 *       type: object
 *       description: list of all trainers
 *       required:
 *         - firstName
 *         - lastName
 *         - level
 *         - competencies
 *         - needWheelChair
 *         - city
 *         - country
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName: 
 *           type: string
 *         level: 
 *           type: number
 *         competencies:
 *           type: array
 *           items:
 *             type: string
 *          wheelchairAccessible:
 *            type: boolean
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          createdAt:
 *            type: string
 *            format: date-time   
 */ 
trainerRouter.get('/:topic/trainers', courseTrainers)


export {trainerRouter}