import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = "mongodb://localhost:27017/employee-information";

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);

    return client;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection) {
  const db = client.db();

  const documents = await db.collection(collection).find().toArray();

  return documents;
}

export async function getDocument(client, collection, id) {
  const db = client.db();
  const studentId = { _id: ObjectId(id) };

  const getDoc = await db.collection(collection).findOne(studentId);

  return getDoc;
}

export async function updateDocument(client, collection, id, document) {
  const db = client.db();
  const studentId = { _id: ObjectId(id) };

  const result = await db
    .collection(collection)
    .updateOne(studentId, { $set: document });

  return result;
}

export async function deleteDocument(client, collection, id) {
  const db = client.db();
  const studentId = { _id: ObjectId(id) };

  const document = await db.collection(collection).remove(studentId);

  return document;
}
