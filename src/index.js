import express, { urlencoded, json } from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import mongoose from "mongoose";

import "dotenv/config";

const app = express();

import { config } from "./config";
import { routes } from "./routes";

const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors());

// Routes

routes(app);
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Booking API",
      version: "1.0.0",
      description: "Booking API",
    },
    servers: [{
      url: `http://localhost:${PORT}`
    }]
  },
  apis: ['./routes/trainer.js'],
};

const specs = swaggerJsDoc(options);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));

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
