const Quiz = require("../model/quiz");
const { FilterType } = require("../schema/types/quiz.type");
const { saveAnswer } = require("./result.repository");

const createQuizQuestions = async (quizInput) => {
  await Quiz.insertMany(quizInput);
};

const getQuizQuestions = async ({ category }) => {
  return await Quiz.findOne({ category });
};

const getQuestionByCategoryAndQuestionNumber = async ({
  category,
  questionNumber,
}) => {
  const { questions } = await Quiz.findOne(
    { category: category, questions: { $elemMatch: { questionNumber } } },
    { questions: 1, _id: 0 }
  );
  return questions.find(
    (question) => question.questionNumber === questionNumber && question
  );
};

const addQuestion = async ({ category, questionType }) => {
  const { options } = questionType;
  await Quiz.updateOne(
    { category },
    {
      $push: {
        questions: {
          questionNumber: questionType.questionNumber,
          question: questionType.question,
          options,
          answer: questionType.answer,
        },
      },
    }
  );
};

const submitAnswer = async ({ user, category, question }) => {
  const { answer } = await getQuestionByCategoryAndQuestionNumber({
    category,
    questionNumber: question.questionNumber,
  });
  const record = {
    user,
    category,
    question: {
      questionNumber: question.questionNumber,
      option: question.option,
    },
    answer: answer,
  };
  await saveAnswer(record);
};

module.exports = {
  createQuizQuestions,
  getQuizQuestions,
  getQuestionByCategoryAndQuestionNumber,
  addQuestion,
  submitAnswer,
};
