import { Router } from "express";
import { addStudentToBooking, createBooking, deleteBooking, removeStudentFromBooking, studentBookings } from "../controllers/booking";
import { requireSign } from "../middlewares";

const bookingRouter = Router()

bookingRouter.post('/booking/create', requireSign, createBooking)
bookingRouter.put('/booking/:id/add-student', /*requireAdmin*/ addStudentToBooking)
bookingRouter.get('/user/bookings', requireSign, studentBookings)
bookingRouter.put('/booking/:id/remove-student', /*requireAdmin*/ removeStudentFromBooking)
bookingRouter.delete('/booking/delete/:id', /*requireAdmin*/ deleteBooking)


export {bookingRouter}