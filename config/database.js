import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected To ${connection.host}`);
  } catch (e) {
    console.log(`Something Went Wrong: ${e.message}`);
  }
};
