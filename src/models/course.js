import Mongoose from "mongoose";


const courseSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model("course", courseSchema)