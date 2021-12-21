import Location from "../models/location";

const cityLocations = async (req, res) => {
  try {
    const { city } = req.params;
    Location.find({ "city": { $eq: city } }).exec((_, locations) => {
      if (res) {
        res.status(200).json({ locations });
        return;
      }
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export { cityLocations };
