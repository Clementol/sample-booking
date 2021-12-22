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
      "students.studentId": { $eq: studentId },
    }).exec((_, booking) => {
      if (booking) {
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
      if (booking) {
        //base on same location and course

        // check if trainer is available base on date
        if (startDate >= booking.startDate && endDate <= booking.endDate) {
          //update booking by adding student
          Booking.updateOne(bookingFilter, {
            $push: { students: { studentId: studentId, email: email } },
          }).then(() => {
            const msg = { message: `booking successful` };
            return res.status(201).json(msg);
          });
        } else {
          return res.status(400).json({ error: "trainer not available" });
        }
      } else {
        //base on different location

        // Get topic, level base on courseId
        await Course.findById(courseId).exec((_, course) => {
          // check location base on locationName, locationCity and
          // return location details with wheelchairAccessible
          await Location.findById(locationId).exec((_, location) => {
            // selection trainer base on wheelchair, competence(topic), level
            await Trainer.find({
              wheelchairAccessible: location.needWheelchair,
              level: course.level,
              competencies: { $in: [course.topic] },
            }).exec((_, trainer) => {
              if (trainer) {
                // check if trainer is avail on specified date

                // new booking
                new Booking({
                  courseId: courseId,
                  locationId: locationId,
                  trainerId: trainer._id,
                  students: [{ studentId: studentId, email: email }],
                  startDate: startDate,
                  endDate: endDate,
                })
                  .save()
                  .then(() => {
                    const msg = { message: `booking successful` };
                    return res.status(200).json(msg);
                  });
              }
            });
          });
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
      if (booking) {
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

  try {
    const { id, email } = req.user;
    const studentId = id;
    const { courseId, locationId } = req.body;
    //check if user already booked the course
    Booking.find({
      _id: courseId,
      "students.studentId": { $eq: studentId },
    }).exec((_, booking) => {
      if (booking) {
        // remove student
      } else {
        return res.status(400).json({error: `student not booked`})
      }
    });
  } catch (error) {
    
  }

};

const deleteBooking = (req, res) => {
  try {
    const {bookingId} = req.body
    Booking.findOneAndRemove({_id: bookingId})
    .then(() =>  {
      res.status(202).json({message: "booking deleted"})
      return
    })
  } catch (error) {
    res.status(400).json({message: `Unable to delete booking ${error}`})
      return
  }
};

export { createBooking };
