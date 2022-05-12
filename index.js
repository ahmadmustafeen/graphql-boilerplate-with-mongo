const {ApolloServer,gql} = require('apollo-server');
const {User} = require('./dataset/Users');
const {typeDefs} = require('./typedefs');
const {resolver} = require('./resolvers');
require("dotenv").config();
const { default: mongoose } = require('mongoose');
const { getUser } = require('./helper');






const port = 4001


const server = new ApolloServer({
    port: port,
    typeDefs,
    cors: true,
    resolvers: resolver,
    context: ({ req }) => {
          if (req.headers && req.headers.authorization) {
            var auth = req.headers.authorization;
            var parts = auth.split(" ");
            var bearer = parts[0];
            var token = parts[1];
            if (bearer == "Bearer") {
              const user = getUser(token);
              if (user.error) {
                throw Error(user.msg);
              } else return { user };
            } else {
              throw Error("Authentication must use Bearer.");
            }
          } else {
            throw Error("User must be authenticated.");
          }
    
      },
})
const connect = mongoose.connect(process.env.MONGODB_PATH, { useNewUrlParser: true });

connect.then(
(db) => {
    server.listen(port).then((url)=>console.log(`Connected to DB and is live on: ${url.url}`))
},
(err) => {
  console.log(err);
}
);

