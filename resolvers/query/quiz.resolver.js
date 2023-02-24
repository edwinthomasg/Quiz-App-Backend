const generateRandomIndex = require("../../helpers/generateIndex");
const { default: jwtDecode } = require("jwt-decode");
const { authenticateUser } = require("../../helpers/authenticate");
const { getQuizQuestions } = require("../../repository/quiz.repository");
const { verify } = require("jsonwebtoken");
const {
  getUserResult,
  updateTime,
} = require("../../repository/result.repository");
const { PASS_PERCENTAGE } = require("../../constants/constant");
const stopwatch = require("statman-stopwatch");

let questionsArray = [];
let noOfQuestions;
const timer = new stopwatch();

const quizByCategoryResolver = async (_, { filter }, context) => {
  try {
    if (context.rawHeaders[0] === "Authorization") {
      const { id } = jwtDecode(context.rawHeaders[1]);
      console.log("token : ", context.rawHeaders[1]);
      verify(context.rawHeaders[1], "secret", (err, user) => {
        if (err) throw "token expired";
        console.log("user : ", user);
      });
      await authenticateUser(id);
    } else throw "No Auth Token";
  } catch (err) {
    throw err;
  }
  const questions = await getQuizQuestions(filter);
  if (questionsArray.length === 0) {
    questionsArray = questions.questions;
    noOfQuestions = questionsArray.length;
  }
  const randomIndex = generateRandomIndex(0, questionsArray.length - 1);
  const clientQuestion = questionsArray[randomIndex];
  questionsArray.splice(randomIndex, 1);
  if (filter.questionNo > noOfQuestions)
    throw `This section has only ${noOfQuestions} questions`;
  return clientQuestion;
};

const resultResolver = async (_, { resultInput }, context) => {
  try {
    if (context.rawHeaders[0] === "Authorization") {
      const { id } = jwtDecode(context.rawHeaders[1]);
      console.log("token : ", context.rawHeaders[1]);
      verify(context.rawHeaders[1], "secret", (err, user) => {
        if (err) throw "token expired";
        console.log("user : ", user);
      });
      await authenticateUser(id);
      const result = await getUserResult(resultInput);
      const totalQuestions = result.questions.length;
      const correctAnswers = result.questions.filter(
        (question) => question.correct
      ).length;
      const minimumCutOff = Math.floor(
        (totalQuestions * PASS_PERCENTAGE) / 100
      );
      const stat = {
        correctQuestions: correctAnswers,
        pass: correctAnswers >= minimumCutOff ? true : false,
      };
      return {
        ...result._doc,
        ...stat,
      };
    } else throw "No Auth Token";
  } catch (err) {
    throw err;
  }
};

const startTimerResolver = () => {
  timer.start();
  return "Test Started";
};

const stopTimerResolver = async (_, { timerInput }) => {
  const { user, category } = timerInput;
  timer.stop();
  await updateTime({ user, category, duration: timer.read() });
  return "Test Ended";
};

module.exports = {
  quizByCategoryResolver,
  resultResolver,
  startTimerResolver,
  stopTimerResolver,
};
