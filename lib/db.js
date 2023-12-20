import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://cosovicnenad14:arsenal95@cluster0.0rzttmk.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );
  return client
}
