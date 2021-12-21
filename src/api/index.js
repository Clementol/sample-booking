import {authRouter} from "./auth";
import { bookingRouter } from "./booking";
import { locationRouter } from "./location";
import { trainerRouter } from "./trainer";


const routes = (app) => {
  app.use("/api", authRouter);
  app.use("/api", bookingRouter);
  app.use("/api", trainerRouter);
  app.use("/api", locationRouter);
};

export {routes}
