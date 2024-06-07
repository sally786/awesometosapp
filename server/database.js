require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = new MongoClient(uri, options);
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
    }
  }
  return client;
};

const getConnectedClient = () => {
  if (!client) {
    throw new Error("MongoDB client is not connected. Call connectToMongoDB first.");
  }
  return client;
};

module.exports = { connectToMongoDB, getConnectedClient };
