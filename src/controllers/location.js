import { responseMessage } from "../helpers/response";
import Location from "../models/location";

const cityLocations = async (req, res) => {
  try {
    const { city } = req.params;
    Location.find({ "city": { $eq: city } }).exec((_, locations) => {
      if (locations.length >= 1) {
        res.status(200).json(responseMessage(locations, "get locations successfully", true));
        return;
      } else {
        const message = `No location found`
        res.status(400).json(responseMessage({}, message, false));
        return;
      }
    
    });
  } catch (err) {
    const  error = `Unable to get locations ${err}`
    return res.status(400).json(responseMessage({}, error, false));

  }
};

export { cityLocations };
