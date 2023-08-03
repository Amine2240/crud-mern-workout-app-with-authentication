const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  nreps: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Workoutmodel = mongoose.model("workouts", WorkoutSchema);
module.exports = Workoutmodel;
