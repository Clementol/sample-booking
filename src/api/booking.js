import { Router } from "express";
import { addStudentToBooking, createBooking, deleteBooking, removeStudentFromBooking } from "../controllers/booking";
import { requireSign } from "../middlewares";

const bookingRouter = Router()

bookingRouter.post('/booking/create', requireSign, createBooking)
bookingRouter.put('/booking/add-student', /*requireAdmin*/ addStudentToBooking)
bookingRouter.put('/booking/:id/remove-student', /*requireAdmin*/ removeStudentFromBooking)
bookingRouter.delete('/booking/delete/:id', /*requireAdmin*/ deleteBooking)


export {bookingRouter}