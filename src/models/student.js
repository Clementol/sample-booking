import Mongoose from "mongoose";

const studentSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

export default Mongoose.model("student", studentSchema);
