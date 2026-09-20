const mongoose = require("mongoose");

const DEFAULT_URI = "mongodb://127.0.0.1:27017/expense-dashboard";

// Connects to MongoDB using Mongoose. Reads the connection string from
// MONGO_URI (see .env.example) and falls back to a local database.
async function connectDB() {
  const mongoUri = process.env.MONGO_URI || DEFAULT_URI;
  await mongoose.connect(mongoUri);
  console.log(`MongoDB connected -> ${mongoose.connection.name}`);
}

module.exports = connectDB;
