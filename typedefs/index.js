const { gql } = require("apollo-server");
// all the fields used in the resolver must be backed by the typeDefs
// define everything you will use inside your query or in mutation
// define query you will use in your graphql
// define mutation you will use in your graphql
// PS. do not raise empty Query or Resolver Body
module.exports = {
  typeDefs: gql`
    type User {
      id: String
      firstName: String
      lastName: String
      email: String
    }

    type Query {
      FetchUsers: [User]
      FilterUser(id: String): User
    }
    type Mutation {
      CreateUser(firstName: String!, lastName: String!, email: String!): User
    }
  `,
};
