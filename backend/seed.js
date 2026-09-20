// Populates MongoDB with sample transactions.
// Run with: npm run seed

require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Expense = require("./models/expense.model");
const seedData = require("./seed/expenses.seed.json");

async function seed() {
  await connectDB();
  await Expense.deleteMany({});
  await Expense.insertMany(seedData);
  console.log(`Seeded ${seedData.length} expenses`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
