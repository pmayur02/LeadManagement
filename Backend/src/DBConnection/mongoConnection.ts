import mongoose from "mongoose";

async function dbConnection(DB_URL: string){
  try {
    await mongoose.connect(DB_URL);

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return {
        statusCode:500,
        message:`failed to connect mongodb ${error}`
    }
    
  }
}

export default dbConnection;