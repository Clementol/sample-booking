import { responseMessage } from "../helpers/response";
import Booking from "../models/booking";
import Course from "../models/course";
import Location from "../models/location";
import Trainer from "../models/trainer";

const createBooking = async (req, res) => {
  try {
    const { id, email } = req.user;
    const studentId = id;
    const {
      courseId,
      locationId,
      startDate,
      endDate,
      locationName,
      locationCity,
    } = req.body;
    //check if user already booked the course
    Booking.find({
      courseId: courseId,
      students: { $elemMatch: { studentId: studentId } },
    }).exec(async (_, booking) => {
      if (booking.length == 1) {
        const error = "Already registered for this course!"
        res.status(400).json(responseMessage({}, error, false));
        return;
      } else {
        // create booking base on location and course
        let bookingFilter = {
          locationId: locationId,
          courseId: courseId,
        };
        await Booking.findOne(bookingFilter).exec((_, booking) => {
          if (booking) {
            //base on same location and course

            //update booking by adding student
            Booking.updateOne(bookingFilter, {
              $push: { students: { studentId: studentId, email: email } },
            }).then(() => {
              const message = `booking successful` 
              return res.status(201).json(responseMessage({}, message, true ));
            });
          } else {
            //base on different location

            // Get topic, level base on courseId
            Course.findById({ _id: courseId }).exec(async (_, course) => {
              // check location base on locationName, locationCity and
              // return location details with wheelchairAccessible

              if (course) {
                await Location.findById({ _id: locationId }).exec(
                  async (_, location) => {
                    if (location) {
                      // selection trainer base on wheelchair, competence(topic), level
                      await Trainer.find({
                        wheelchairAccessible: location.needWheelchair,
                        level: course.level,
                        competencies: { $in: [course.topic] },
                      }).exec(async (_, trainer) => {
                        // check if trainer is avail on specified date
                        let selectedTrainer =
                          trainer.length > 1 ? trainer[0] : trainer;
                        // new booking
                        await Booking.create({
                          courseId: courseId,
                          locationId: locationId,
                          trainerId: selectedTrainer._id,
                          students: [{ studentId: studentId, email: email }],
                          startDate: startDate,
                          endDate: endDate,
                        })

                          .then((booking) => {
                            if (booking) {
                              const msg = `New booking created`;
                              return res.status(200).json(responseMessage(booking, msg, true ));
                            }
                          })
                          .catch((err) => {
                            const error = `Can't create new booking ${err}`
                          
                            return res.status(400).json(responseMessage({}, error, false));
                          });
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  } catch (err) {
    const error = `Unable to create booking ${err}` ;
    return res.status(400).json(responseMessage({}, error, false));
  }
};

const studentBookings = async (req, res) => { 
  try {
    
    let studentId = req.user.id
    await Booking.find({
      students: { $elemMatch: { studentId: studentId } },
    }).then(async( bookings) => {
      return res.status(200).json(responseMessage(bookings, "success", true))
     })
  } catch (err) {
    const error = `Unable to get student bookings ${err}`
    return res.status(400).json(responseMessage({}, error, false))
  }
}

const addStudentToBooking = async (req, res) => {
  try {
    // const { id, email } = req;
    const bookingId = req.params.id;
    const { studentId, email } = req.body;

    //check if user already booked the course
    await Booking.findById({
      _id: bookingId,
    }).exec((err, booking) => {
      if (err) {
        const error = `Booking doesn't exist`
        return res.status(400).json(responseMessage({}, error, false));
      }
   
    });
    
    await Booking.findOne({
      _id: bookingId,
      students: { $elemMatch: { studentId: studentId } },
    }).then(async( booking) => {
      if (booking) {
        const error = "Already registered for this course!" 
        return res
          .status(400)
          .json(responseMessage({}, error, false));
      } else {
        let bookingFilter = {
          _id: bookingId,
        };
    
        await Booking.updateOne(bookingFilter, {
          $push: { students: { studentId: studentId, email: email } },
        })
          .then((booking) => {
            if (booking) {
              const msg = `student added to booking`
              return res.status(201).json(responseMessage(booking, msg, true));
            }
          })
          .catch((err) => {
            if (err) {
              const error = `Can't find booking to add student ${err}`
              return res.status(400).json(responseMessage({}, error, false));
            }
          });
      }
    })
    
  } catch (err) {
    const error = `Unable to add student to booking ${err}`;
    return res.status(400).json(responseMessage({}, error, false));
  }
};

const removeStudentFromBooking = async (req, res) => {
  let msg;
  try {
    // const {admin} = req.user;
    const bookingId = req.params.id;
    const { studentId } = req.body;
    //check if user already booked the course
    let filterOptions = {
      _id: bookingId,
      students: { $elemMatch: { studentId: studentId } },
    };
    await Booking.findOne(filterOptions).exec((_, booking) => {
      if (booking) {
        // remove student
        Booking.updateOne(filterOptions, {
          $pull: { students: { studentId: studentId } },
        }).then(() => {
          msg = `Remove student from booking`;
          return res.status(202).json(responseMessage({}, msg, true));
        });
      } else {
        const error = `student not booked`
        return res.status(400).json(responseMessage({}, error, false));
      }
    });
  } catch (err) {
    const error = `Unable to remove student from booking ${err}`
    return res.status(400).json(responseMessage({}, error, false));
  }
};

const deleteBooking = async (req, res) => {
  try {
    // const {admin} = req.user;
    const { id } = req.params;
    // await Booking.find({ id }).exec((err, booking) => {
    //   if (err) {
    //     res.status(400).json({ error: "booking does not exist" });
    //     return;
    //   } else if (booking) {
         await Booking.findOneAndRemove({ _id: id }).then((booking) => {
          if (booking) {
            const message = "booking deleted"
            res.status(202).json(responseMessage({}, message, true));
            return;
          } else {
            const error = `booking does not exist`
            res.status(400).json(responseMessage({}, error, false));
          return;
          }
        }).catch(err => {
          const error = `booking does not exist`
          res.status(400).json(responseMessage({}, error, false));
          return;
        })
      // }
    // });
   
  } catch (error) {
    const msg = `Unable to delete booking ${error}`
    res.status(400).json(responseMessage({}, msg, false));
    return;
  }
};

export {
  createBooking,
  addStudentToBooking,
  studentBookings,
  removeStudentFromBooking,
  deleteBooking,
};
