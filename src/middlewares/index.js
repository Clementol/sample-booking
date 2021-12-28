import jwt from "jsonwebtoken";
import { config } from "../config";
import { responseMessage } from "../helpers/response";

const requireSign = (req, res, next) => {
  let error
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      error = "login is required" 
      res.status(401).json(responseMessage({}, error, false));
      return;
    }

    //Verify token
    
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    error = `logging in error`
    res.status(401).json(responseMessage({}, error, false));
    return
  }
};

export { requireSign };
