const { getConnectedClient } = require("../database");

const getCollection = async () => {
  await connectToMongoDB(); // Ensure the client is connected
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("todos");
  return collection;
};


module.exports = { getCollection };