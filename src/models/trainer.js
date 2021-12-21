import Mongoose from "mongoose";

// [{"firstName":"Cooper","lastName":"Lerohan","level":5,
// "competencies":["Fullstack","Security"],"needWheelchair":true,
// "city":"Aston","country":"United Kingdom"},

const trainerSchema = new Mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  competencies: [
    {
      type: String,
      required: true,
    },
  ],
  needWheelchair: {
      type: Boolean,
      required: true
  },
  city: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true
  }
});

export default Mongoose.model("trainer", trainerSchema);

