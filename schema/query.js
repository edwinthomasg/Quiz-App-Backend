const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
} = require("graphql");
const { FilterType, ResultFilter } = require("./types/quiz.type");
const {
  QuestionsResponse,
  TokenResponse,
  ResultResponse,
} = require("./types/response.type");
const {
  quizByCategoryResolver,
  resultResolver,
  startTimerResolver,
  stopTimerResolver,
} = require("../resolvers/query/quiz.resolver");
const { tokenResolver } = require("../resolvers/query/auth.resolver");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: () => ({
    getQuizByCategory: {
      type: QuestionsResponse,
      args: {
        filter: { type: FilterType },
      },
      resolve: quizByCategoryResolver,
    },
    getAccesToken: {
      type: TokenResponse,
      args: {
        refreshToken: { type: GraphQLString },
      },
      resolve: tokenResolver,
    },
    getResult: {
      type: ResultResponse,
      args: {
        resultInput: { type: ResultFilter },
      },
      resolve: resultResolver,
    },
    startTimer: {
      type: GraphQLString,
      resolve: startTimerResolver,
    },
    stopTimer: {
      type: GraphQLString,
      args: {
        timerInput: { type: ResultFilter },
      },
      resolve: stopTimerResolver,
    },
  }),
});

module.exports = RootQueryType;
