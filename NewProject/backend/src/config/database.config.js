import { connect, set } from "mongodb";

set("strictQuery", true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect Successfully...!!!");
  } catch (error) {
    console.log(error);
  }
};
