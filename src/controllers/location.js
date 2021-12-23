import Location from "../models/location";

const cityLocations = async (req, res) => {
  try {
    const { city } = req.params;
    Location.find({ "city": { $eq: city } }).exec((_, locations) => {
      if (locations) {
        res.status(200).json({ locations });
        return;
      } else {
        res.status(400).json({message: `No location found` });
        return;
      }
    
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export { cityLocations };
