import {authRouter} from "./auth";
import { bookingRouter } from "./booking";
import { locationRouter } from "./location";
import { trainerRouter } from "./trainer";


const routes = (app) => {
  
  const v1 = app
  v1.use("/api/v1", authRouter);
  v1.use("/api/v1", bookingRouter);
  v1.use("/api/v1", trainerRouter);
  v1.use("/api/v1", locationRouter);

};

export {routes}
