//# HELPER function file
import { MongoClient } from "mongodb";

export async function connectToDB() {
  const cluster = {
    username: "JasonAdmin",
    password: process.env.MONGO_PASSWORD,
    db: "local-eats",
  };
  try {
    const mongoURI = `mongodb+srv://${cluster.username}:${cluster.password}@cluster0.fojrq.mongodb.net/${cluster.db}?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(mongoURI);
    const db = client.db();
    return db; // return db instance
  } catch (error) {
    return null;
  }
}
