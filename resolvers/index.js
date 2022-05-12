
const {Users} = require('../models/UserSchema');
//resolver holds the actions you will us here
module.exports = {
  resolver: {
    //define query functions you will use in your graphql
    Query: {
      //these must match the functions to have define in the typeDefs
      FetchUsers: async () => await Users.find(),
      FilterUser: async (root, args, context, info) => {
        return await Users.find({id: args.id});
      },
    },
    Mutation: {
      CreateUser: async (root, args, context, info) => {
          const user = await Users.find()
        const users = Users({
          id: user.length,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        });
        users.save();
        return args;
      },
    },
  },
};
