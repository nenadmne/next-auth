import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://cosovicnenad14:arsenal95@cluster0.0rzttmk.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );
  return client;
}

export async function userExists(db, collectionName, query) {
  try {
    const collection = db.collection(collectionName);
    const user = await collection.findOne(query);
    return user;
  } catch (error) {
    throw new Error(`Error checking user existence: ${error.message}`);
  }
}
