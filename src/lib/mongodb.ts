import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/state-exam-prep';
const options = {};

let clientPromise: Promise<MongoClient> | null = null;

async function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getClient();
  // If database name is embedded in URI, driver will use it; otherwise default to explicit name
  return client.db('state-exam-prep');
}

export default getClient;
