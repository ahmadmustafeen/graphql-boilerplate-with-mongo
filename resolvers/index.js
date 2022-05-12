
const {Users} = require('../models/UserSchema');
//resolver holds the actions you will us here


// PS. if the output doesnt match the format as given in the typedefs then it will not work, will not show the data
// must match array of objects if array is the output defined in the typedefs

module.exports = {
  resolver: {
    //define query functions you will use in your graphql
    Query: {
      //these must match the functions to have define in the typeDefs
      FetchUsers: async () => await Users.find(),
      FilterUser: async (root, args, context, info) => {
        return await Users.find({id: args.id});
      },
      LoginUser: async (root, args, context, info) => {
        const user  = await Users.findOne({email: args.email, password: args.password});
        return user
      }
    },
    Mutation: {
      CreateUser: async (root, args, context, info) => {
          const user = await Users.find()
        const users = Users({
          id: user.length,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
            password: args.password
        });
        users.save();
        return args;
      },
    },
  },
};
