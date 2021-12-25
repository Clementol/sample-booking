import Mongoose from "mongoose";

const bookingSchema = new Mongoose.Schema(
  {
    courseId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    locationId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "location",
      required: true,
    },
    trainerId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "trainer",
      required: true,
    },
    students: [
      {
        studentId: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        email: {
          type: String,
          required: true,
          // unique: true,
        },
      },
    ],
    certificateMandatory: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    comments: [
      {
        studentEmail: {
          type: String,
          // unique: true,
          required: false
        },
        text: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default Mongoose.model("booking", bookingSchema);
