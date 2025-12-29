import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log("fdrdtfh", process.env.MONGODB_URI)
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("done.  nfghg")

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;