import Course from "../models/course";
import Location from "../models/location";

const initialData = (req, res) => {
  try {
    Course.find().then((courses) => {
      Location.find().then((locations) => {
        return res.status(200).json({ courses: courses, locations: locations });
      });
    });
  } catch (error) {
    return res.status(400).jsong({ error: `Can't get data ${error}` });
  }
};

export { initialData };
