import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DB_NAME}`
    );
    console.log(
      `MongoDB Connected! Host:${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    throw error;
  }
};

export default connectDB;
