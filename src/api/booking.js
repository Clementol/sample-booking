import { Router } from "express";
import { addStudentToBooking, createBooking, deleteBooking, removeStudentFromBooking } from "../controllers/booking";
import { requireSign } from "../middlewares";

const bookingRouter = Router()

bookingRouter.post('/booking/create', requireSign, createBooking)
bookingRouter.put('/booking/add-student', requireSign, addStudentToBooking)
bookingRouter.put('/booking/remove-student', requireSign, removeStudentFromBooking)
bookingRouter.delete('/booking/delete/:id', requireSign, deleteBooking)


export {bookingRouter}