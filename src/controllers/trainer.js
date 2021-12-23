import Trainer from "../models/trainer";

const courseTrainers = async (req, res) => {
  try {
    const { course } = req.params;
    Trainer.find({ competencies: { $in: [course] } }).exec((_, trainers) => {
      if (trainers.length >= 1) {
        res.status(200).json({ trainers });
        return;
      } else {
        return res.status(400).json({ message: `No trainer found` });
      }
    });
  } catch (err) {
    return res.status(400).json({ error: `Unable to get trainer ${err}` });
  }
};

export { courseTrainers };
