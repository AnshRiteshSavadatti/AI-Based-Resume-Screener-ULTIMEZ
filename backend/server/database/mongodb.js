import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define MONGODB_URI environment varirable inside .env.development.local"
  );
}

const connnectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to databast in development mode `);
  } catch (error) {
    console.log("Error connection to database", error);
    process.exit(1); // code 1 means faliuer
  }
};

export default connnectToDatabase;
