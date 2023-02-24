const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
} = require("graphql");
const {
  RegisterResponse,
  LoginResponse,
  QuizResponse,
  AnswerResponse,
  AddedQuestionResponse,
} = require("./types/response.type");
const { RegisterType, LoginType } = require("./types/auth.type");
const { QuizType, AnswerType, QuestionType } = require("./types/quiz.type");
const {
  registerResolver,
  loginResolver,
} = require("../resolvers/mutation/auth.resolver");
const {
  quizResolver,
  answerResolver,
  questionResolver,
} = require("../resolvers/mutation/quiz.resolver");
const { addQuestion } = require("../repository/quiz.repository");

const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  description: "Root Mutation",
  fields: () => ({
    register: {
      type: RegisterResponse,
      args: { credential: { type: RegisterType } },
      resolve: registerResolver,
    },
    login: {
      type: LoginResponse,
      args: {
        credential: { type: LoginType },
      },
      resolve: loginResolver,
    },
    createQuiz: {
      type: QuizResponse,
      args: {
        quizInput: { type: QuizType },
      },
      resolve: quizResolver,
    },
    addQuestion: {
      type: AddedQuestionResponse,
      args: {
        questionInput: { type: QuestionType },
        category: { type: GraphQLString },
      },
      resolve: questionResolver
    },
    answerQuiz: {
      type: AnswerResponse,
      args: {
        answerInput: { type: AnswerType },
      },
      resolve: answerResolver,
    },
  }),
});

module.exports = RootMutationType;

// admin token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjRiZmZhNGViOTA0N2IxMjZjN2ZlZCIsInJvbGUiOiI2M2Y0YWM0ZjJkMjcxODQ0ZGE2YzEyZTQiLCJpYXQiOjE2NzcwNDYxNDQsImV4cCI6MTY3NzEzMjU0NH0.UOpW1AYpoJeVlqvYZnkRmBsutyUfFkCwetwDafLZbYE
