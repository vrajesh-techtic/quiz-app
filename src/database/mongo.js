const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.

const mongo = () => {
  const uri =
    "mongodb+srv://vrajesh-techtic:techtic1234@techtic-cluster.o6bnr8l.mongodb.net/?retryWrites=true&w=majority&appName=Techtic-Cluster";

  const client = new MongoClient(uri);

  async function addUser(userName, userEmail) {
    try {
      const database = client.db("quiz_app");

      const query = {
        name: userName,
        email: userEmail,
      };

      const row = await database.collection("participants").insertOne(query);
      console.log("Row added!", row);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  async function updateUser(userName) {
    try {
      const database = client.db("quiz_app");

      const query = { name: userName };

      const res = await database.collection("participants").deleteOne(query);
      console.log("res", res);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
};

module.exports = mongo;
