import {authRouter} from "./auth";
import { bookingRouter } from "./booking";
import { initialDataRouter } from "./initialData";
import { locationRouter } from "./location";
import { trainerRouter } from "./trainer";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express'



const routes = (app) => {

  const v1 = app
  v1.use("/api/v1", authRouter);
  v1.use("/api/v1", bookingRouter);
  v1.use("/api/v1", trainerRouter);
  v1.use("/api/v1", locationRouter);
  v1.use("/api/v1", initialDataRouter);



};

export {routes}
