const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
const Recipe = require("./models/Recipe");
const User = require("./models/User");

// Bring in GraphQL-express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");

const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// initialize app
const app = express();

// create Graphiql application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Connect shcemas to Graphql
app.use(
  "/graphql",
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
