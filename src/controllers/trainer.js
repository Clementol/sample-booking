import { responseMessage } from "../helpers/response";
import Trainer from "../models/trainer";

const courseTrainers = async (req, res) => {
  try {
    const { course } = req.params;
    Trainer.find({ competencies: { $in: [course] } }).exec((_, trainers) => {
      if (trainers.length >= 1) {
        res.status(200).json(responseMessage(trainers, "success", true));
        return;
      } else {
        const message = `No trainer found`
        return res.status(400).json(responseMessage({}, message, false));
      }
    });
  } catch (err) {
    const error = `Unable to get trainer ${err}`
    return res.status(400).json(responseMessage({}, error, false));
  }
};

export { courseTrainers };
