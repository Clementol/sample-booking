import { Router } from "express";
import { cityLocations } from "../controllers/location";

const locationRouter = Router()

locationRouter.get('/:city/locations', cityLocations)


export {locationRouter}