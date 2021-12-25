import { Router } from "express";
import { initialData } from "../controllers/initialData";

const initialDataRouter = Router()

initialDataRouter.get('/initial-data', initialData)


export {initialDataRouter}