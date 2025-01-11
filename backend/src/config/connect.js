import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connect = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to Mongoose");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connect;
