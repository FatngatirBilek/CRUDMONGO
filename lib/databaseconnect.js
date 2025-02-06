import { mongoose } from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOKONZ);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};
export default connect;
