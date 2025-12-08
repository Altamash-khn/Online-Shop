const { MongoClient } = require("mongodb");

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  database = client.db("online-shop");
}

function getDb() {
  if (!database) {
    throw new Error("Database not connected!");
  }
  return database;
}

module.exports = { connectToDatabase, getDb };
