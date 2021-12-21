import Trainer from "../models/trainer";

const courseTrainers = async (req, res) => {
  try {
    const { course } = req.params;
    Trainer.find({ competencies: { $in: [course] } }).exec((_, trainers) => {
      if (res) {
        res.status(200).json({ trainers });
        return;
      }
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export { courseTrainers };
