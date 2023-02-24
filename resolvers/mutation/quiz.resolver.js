const {
  createQuizQuestions,
  submitAnswer,
  getQuizQuestions,
  addQuestion,
} = require("../../repository/quiz.repository");
const authorize = require("../../helpers/authorize");
const { default: jwtDecode } = require("jwt-decode");
const { verify } = require("jsonwebtoken");
const { authenticateUser } = require("../../helpers/authenticate");

const quizResolver = async (_, { quizInput }, context) => {
  const headerToken = context.rawHeaders[1];
  if (context.rawHeaders[0] !== "Authorization") throw "No Auth Token";
  const role = await authorize(headerToken);
  if (role === "admin") {
    const quiz = await getQuizQuestions({ category: quizInput.category });
    if (quiz)
      throw `ALready quiz has been for the category ${quizInput.category}`;
    if (quizInput.questions && quizInput.questions.length < 5)
      throw `Atleast quiz should have 5 questions for the category ${quizInput.category}`;
    await createQuizQuestions(quizInput);
    return {
      status: 201,
      message: "Successfully quiz added",
    };
  } else {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }
};

const answerResolver = async (_, { answerInput }, context) => {
  try {
    if (context.rawHeaders[0] === "Authorization") {
      const { id } = jwtDecode(context.rawHeaders[1]);
      console.log("token : ", context.rawHeaders[1]);
      verify(context.rawHeaders[1], "secret", (err, user) => {
        if (err) throw "token expired";
        console.log("user : ", user);
      });
      await authenticateUser(id);
      await submitAnswer(answerInput);
      return {
        status: 200,
        message: "Answer Submitted",
      };
    } else throw "No Auth Token";
  } catch (err) {
    throw err;
  }
};

const questionResolver = async (_, { questionInput, category }, context) => {
  const headerToken = context.rawHeaders[1];
  if (context.rawHeaders[0] !== "Authorization") throw "No Auth Token";
  const role = await authorize(headerToken);
  if (role === "admin") {
    await addQuestion({ category, questionType: questionInput });
    return {
      status: 200,
      message: "Question Added",
    };
  } else {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }
};

module.exports = {
  quizResolver,
  answerResolver,
  questionResolver,
};
