const Result = require("../model/result");

const saveAnswer = async (record) => {
  const user = await Result.findOne({ user: record.user });
  if (user === null) {
    const userAnswer = new Result({
      user: record.user,
      category: record.category,
      questions: [
        {
          questionNumber: record.question.questionNumber,
          selectedOption: record.question.option,
          correctOption: record.answer,
          correct: record.answer === record.question.option,
        },
      ],
    });
    userAnswer.save();
  } else {
    await Result.updateOne(
      { user: record.user },
      {
        $push: {
          questions: {
            questionNumber: record.question.questionNumber,
            selectedOption: record.question.option,
            correctOption: record.answer,
            correct: record.answer === record.question.option,
          },
        },
      }
    );
  }
};

const getUserResult = async ({ user, category }) => {
  return await Result.findOne({ user, category }, { _id: 0, __v: 0 });
};

const updateTime = async ({ user, category, duration }) => {
  const minutes = parseFloat(Math.floor(duration)/60000).toFixed(2) + "mins"
  await Result.updateOne({ user, category }, { duration: minutes} )
};

module.exports = {
  saveAnswer,
  getUserResult,
  updateTime
};
