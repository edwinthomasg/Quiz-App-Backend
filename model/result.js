const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionNumber: {
        type: Number,
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
      correctOption: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
  duration: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
