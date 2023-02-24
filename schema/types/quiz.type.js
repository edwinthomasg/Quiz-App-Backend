const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const OptionType = new GraphQLInputObjectType({
  name: "OptionType",
  fields: () => ({
    option: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const QuestionType = new GraphQLInputObjectType({
  name: "QuestionType",
  fields: () => ({
    questionNumber: { type: new GraphQLNonNull(GraphQLInt) },
    question: { type: new GraphQLNonNull(GraphQLString) },
    options: { type: new GraphQLNonNull(new GraphQLList(OptionType)) },
    answer: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const QuizType = new GraphQLInputObjectType({
  name: "QuizType",
  fields: () => ({
    category: { type: new GraphQLNonNull(GraphQLString) },
    questions: { type: new GraphQLNonNull(new GraphQLList(QuestionType)) },
  }),
});

const FilterType = new GraphQLInputObjectType({
  name: "FilterInput",
  fields: () => ({
    category: { type: new GraphQLNonNull(GraphQLString) },
    questionNo: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const ResultFilter = new GraphQLInputObjectType({
  name: "ResultFilter",
  fields: () => ({
    user: { type: GraphQLString },
    category: { type: GraphQLString },
  }),
});

const AnswerQuestionType = new GraphQLInputObjectType({
  name: "QuestionInput",
  fields: () => ({
    questionNumber: { type: GraphQLInt },
    option: { type: GraphQLString },
  }),
});

const AnswerType = new GraphQLInputObjectType({
  name: "AnswerInput",
  fields: () => ({
    user: { type: GraphQLString },
    category: { type: GraphQLString },
    question: { type: AnswerQuestionType },
  }),
});

module.exports = {
  OptionType,
  QuestionType,
  QuizType,
  FilterType,
  ResultFilter,
  AnswerType
};
