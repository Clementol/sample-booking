import { responseMessage } from "../helpers/response";
import Course from "../models/course";
import Location from "../models/location";
import Trainer from "../models/trainer";



const initialData = (req, res) => {
  try {
    Course.find().then((courses) => {
      Location.find().then((locations) => {
        Trainer.find().then((trainers) => {
          let data = {
            courses, locations, trainers
          }
          return res
            .status(200)
            .json(responseMessage(data, "success", true));
        });
      });
    });
  } catch (err) {
    const  error = `Can't get data ${err}`
    return res.status(400).json(responseMessage(data, error, false));
  }
};

export { initialData };
