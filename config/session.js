const mongoDbStore = require("connect-mongodb-session");
const expressSession = require("express-session");

function createSeesionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    databaseName: "online-shop",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: createSeesionStore(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  };
}

module.exports = createSessionConfig;
