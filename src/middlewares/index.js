import jwt from "jsonwebtoken";
import { config } from "../config";

const requireSign = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Authorization is required" });
      return;
    }

    //Verify token
    
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: `Token is not valid ${error}` });
    return
  }
};

export { requireSign };
