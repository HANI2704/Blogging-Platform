import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./src/app.js";

const PORT = process.env.PORT || 4000;

async function start() {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, {
        dbName: process.env.MONGODB_DB || undefined,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err.message || err);
      // continue - file DB will still work
    }
  }

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

start();
