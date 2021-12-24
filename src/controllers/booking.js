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
      _id: courseId,
      "students.studentId": studentId 
    }).exec((_, booking) => {
      
      if ((booking.length == 1)) {
        res.status(400).json({ error: "Already registered for this course!" });
        return;
      }
    });

    // create booking base on location and course
    let bookingFilter = {
      locationId: locationId,
      courseId: courseId,
    };
    await Booking.find(bookingFilter).exec((_, booking) => {
   
      if (booking.length == 1) {
        //base on same location and course
        
        //update booking by adding student
        Booking.updateOne(bookingFilter, {
          $push: { students: { studentId: studentId, email: email } },
        }).then(() => {
          const msg = { message: `booking successful` };
          return res.status(201).json(msg);
        });
      } else {
        //base on different location

        // Get topic, level base on courseId
        Course.findById({_id: courseId}).exec(async (_, course) => {
          // check location base on locationName, locationCity and
          // return location details with wheelchairAccessible
          console.log(course)
          if (course) {
            await Location.findById({_id: locationId}).exec(async (_, location) => {
              if (location) {
                // selection trainer base on wheelchair, competence(topic), level
                await Trainer.find({
                  wheelchairAccessible: location.needWheelchair,
                  level: course.level,
                  competencies: { $in: [course.topic] },
                }).exec(async (_, trainer) => {
                  if (trainer.length > 1) {
                    // check if trainer is avail on specified date
                    let selectedTrainer = trainer[0];
                    // new booking
                    await new Booking({
                      courseId: courseId,
                      locationId: locationId,
                      trainerId: selectedTrainer._id,
                      students: [{ studentId: studentId, email: email }],
                      startDate: startDate,
                      endDate: endDate,
                    })
                      .save()
                      .then((booking) => {
                        if (booking) {
                          const msg = { message: `booking successful` };
                          return res.status(200).json(msg);
                        }
                      });
                  }
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    const errMsg = { error: `Unable to create booking ${error}` };
    return res.status(400).json(errMsg);
  }
};

const addStudentToBooking = () => {
  try {
    const { id, email } = req.user;
    const studentId = id;
    const { courseId, locationId } = req.body;

    //check if user already booked the course
    Booking.find({
      _id: courseId,
      "students.studentId": { $eq: studentId },
    }).exec((_, booking) => {
      if (booking.length == 1) {
        res.status(400).json({ error: "Already registered for this course!" });
        return;
      }
    });

    let bookingFilter = {
      locationId: locationId,
      courseId: courseId,
    };

    Booking.updateOne(bookingFilter, {
      $push: { students: { studentId: studentId, email: email } },
    })
      .then(() => {
        const msg = { message: `student added to booking` };
        return res.status(201).json(msg);
      })
      .catch((err) => {
        const errMsg = { error: `Can't find booking to add student ${err}` };
        return res.status(400).json(errMsg);
      });
  } catch (error) {
    const errMsg = { error: `Unable to add student to booking  ${error}` };
    return res.status(400).json(errMsg);
  }
};

const removeStudentFromBooking = async (req, res) => {
  let msg;
  try {
    const { id, email } = req.user;
    const studentId = id;
    const { courseId, locationId } = req.body;
    //check if user already booked the course
    let filterOptions = {
      _id: courseId,
      "students.studentId": { $eq: studentId },
    };
    await Booking.find(filterOptions).exec((_, booking) => {
      if (booking.length == 1) {
        // remove student
        Booking.updateOne(filterOptions, {
          $pull: { students: { studentId: studentId } },
        }).then(() => {
          msg = { message: `Remove student from booking` };
          return res.status(202).json(msg);
        });
      } else {
        return res.status(400).json({ error: `student not booked` });
      }
    });
  } catch (error) {
    msg = { error: `Unable to remove student from booking ${error}` };
    return res.status(400).json(msg);
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findOneAndRemove({ _id: bookingId }).then(() => {
      res.status(202).json({ message: "booking deleted" });
      return;
    });
  } catch (error) {
    res.status(400).json({ message: `Unable to delete booking ${error}` });
    return;
  }
};

export {
  createBooking,
  addStudentToBooking,
  removeStudentFromBooking,
  deleteBooking,
};
