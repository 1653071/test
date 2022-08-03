import { gql, ApolloServer } from "apollo-server"

import db from "./config/db.config"

import mongoose from "mongoose";

db.connect()
const typeDefs = gql`
  
  type User {
    name: String
  }

  
  type Query {
    users: [User]
	user(id: ID): Author
  }
`;

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    name: String,
}, {
    collection: 'users'
});

const user = mongoose.model('users', userSchema);
const resolvers = {
    Query: {
        users: async() => user.find({}),
    },
};



const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    /**
     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
    **/
   
  });
  
  // The listen method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
