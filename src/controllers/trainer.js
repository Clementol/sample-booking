import { responseMessage } from "../helpers/response";
import Trainer from "../models/trainer";

const courseTrainers = async (req, res) => {
  try {
    const { topic } = req.params;
    Trainer.find({ competencies: { $in: [topic] } }).exec((_, trainers) => {
      if (trainers.length >= 1) {
        res.status(200).json(responseMessage(trainers, "get trainer successfully ", true));
        return;
      } else {
        const message = `No trainer found for the topic`
        return res.status(400).json(responseMessage({}, message, false));
      }
    });
  } catch (err) {
    const error = `Unable to get trainer ${err}`
    return res.status(400).json(responseMessage({}, error, false));
  }
};

export { courseTrainers };
