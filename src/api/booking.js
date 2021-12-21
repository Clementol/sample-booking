import { Router } from "express";
import { createBooking } from "../controllers/booking";

const bookingRouter = Router()

bookingRouter.get('/booking/create', createBooking)


export {bookingRouter}