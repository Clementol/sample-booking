import { Router } from "express";
import { courseTrainers } from "../controllers/trainer";

const trainerRouter = Router()

trainerRouter.get('/:course/trainers', courseTrainers)


export {trainerRouter}