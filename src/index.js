import express, { urlencoded, json } from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";

// import authRouter from "./api/auth";


const app = express();


import { config } from "./config";
import { routes } from "./api";

const PORT = 5000;


app.use(compression());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors());

// Routes
routes(app)
// app.use("/api", authRouter);
// app.use("/api", routes.bookingRouter);
// app.use("/api", routes.trainerRouter);
// app.use("/api", routes.locationRouter);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info(`connected to the database`);
  })
  .catch((e) => {
    console.log(`Not connected to database ${e}`);
  });

app.listen(PORT, () => {
  console.error(`server running on port ${PORT}`);
});
