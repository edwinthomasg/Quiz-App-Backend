const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const RegisterResponse = new GraphQLObjectType({
  name: "RegisterResponse",
  fields: () => ({
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

const LoginResponse = new GraphQLObjectType({
  name: "LoginResponse",
  fields: () => ({
    status: { type: GraphQLInt },
    token: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
  }),
});

const QuizResponse = new GraphQLObjectType({
  name: "QuizResponse",
  fields: () => ({
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

const OptionsResponse = new GraphQLObjectType({
  name: "OptionsResponse",
  fields: () => ({
    option: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

const QuestionsResponse = new GraphQLObjectType({
  name: "QuestionsResponse",
  fields: () => ({
    questionNumber: { type: GraphQLInt },
    question: { type: GraphQLString },
    options: { type: new GraphQLList(OptionsResponse) },
    answer: { type: GraphQLString },
  }),
});

const TokenResponse = new GraphQLObjectType({
  name: "TokenResponse",
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

const ResultQuestionResponse = new GraphQLObjectType({
  name: "ResultQuestionResponse",
  fields: () => ({
    questionNumber: { type: GraphQLInt },
    selectedOption: { type: GraphQLString },
    correctOption: { type: GraphQLString },
    correct: { type: GraphQLBoolean },
    _id: { type: GraphQLString },
  }),
});

const ResultResponse = new GraphQLObjectType({
  name: "ResultResponse",
  fields: () => ({
    user: { type: GraphQLString },
    category: { type: GraphQLString },
    questions: { type: new GraphQLList(ResultQuestionResponse) },
    correctQuestions: { type: GraphQLInt },
    pass: { type: GraphQLBoolean },
    duration: { type: GraphQLString },
  }),
});

const AnswerResponse = new GraphQLObjectType({
  name: "AnswerResponse",
  fields: () => ({
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

const AddedQuestionResponse = new GraphQLObjectType({
  name: "AddedQuestionResponse",
  fields: () => ({
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

module.exports = {
  RegisterResponse,
  LoginResponse,
  QuizResponse,
  QuestionsResponse,
  TokenResponse,
  ResultResponse,
  AnswerResponse,
  AddedQuestionResponse,
};
