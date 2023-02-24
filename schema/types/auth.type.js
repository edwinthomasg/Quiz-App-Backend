const {GraphQLInputObjectType, GraphQLString, GraphQLNonNull} = require('graphql')

const RegisterType = new GraphQLInputObjectType({
    name: "RegisterInput",
    description: "Registeration Credentials",
    fields: () => ({
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    }),
  });
  
  const LoginType = new GraphQLInputObjectType({
    name: "LoginInput",
    description: "Login Credentials",
    fields: () => ({
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    }),
  });

  module.exports = {
    RegisterType,
    LoginType
  }