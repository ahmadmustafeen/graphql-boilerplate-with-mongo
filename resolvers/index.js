const { Users } = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getToken } = require("../helper");
const { AuthenticationError } = require("apollo-server");
const { Post } = require("../models/PostSchema");
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
        return await Users.find({ id: args.id });
      },
      LoginUser: async (root, args, context, info) => {
        const user = await Users.findOne({
          email: args.email,
          password: args.password,
        });
        return user;
      },
      CreatePost: async (root, args, context, info) => {
          if(context.user){
            const old_post = await Post.find();
            const post = await new Post({
              id: old_post.length,
              title: args.title,
              content: args.content,
              writer: context.user.email,
            });
            await post.save();
            return "post created";
          }
          else{
            throw new AuthenticationError("User must be authenticated");
          }
     
      },
      FetchPosts: async (_,args,content,info) => {
         if(content.user){
            return await Post.find({writer: content.user.email});
         }
      },
    },
    Mutation: {
      CreateUser: async (root, args, context, info) => {
        const user = await Users.find();
        const users = Users({
          id: user.length,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
      },
      RegisterUser: async (root, args, context, info) => {
        const user = await Users.find();
        if (user.find((user) => user.email === args.email)) {
          throw new Error("User already exists");
        }
        const token = getToken(args);

        const users = Users({
          id: user.length,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
          token: token,
        });
        users.save();
        return { ...args, token: token };
      },
    },
  },
};
