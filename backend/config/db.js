import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://Tara:Hallo12345!@cluster0.sfajdij.mongodb.net/expend-tracker`, {
      useNewUrlParser: true,
      //useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
   
    process.exit(1);
  }
}

connectDB();

export default connectDB;