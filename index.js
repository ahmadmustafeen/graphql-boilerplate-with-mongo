const {ApolloServer,gql} = require('apollo-server');
const {User} = require('./dataset/Users');
const {typeDefs} = require('./typedefs');
const {resolver} = require('./resolvers');
require("dotenv").config();
const { default: mongoose } = require('mongoose');






const port = 4001


const server = new ApolloServer({
    port: port,
    typeDefs,
    cors: true,
    resolvers: resolver,
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

