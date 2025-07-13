import mongoose from "mongoose";

export async function connectMongoDb(dbPath) {
  return mongoose.connect(dbPath);
}
