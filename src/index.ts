import Elysia from "elysia";
import mongoose from "mongoose";
import { auth } from "./routes/auth";
const app = new Elysia();
app.use(auth);
mongoose
  .connect(
    "mongodb+srv://negivikas201:zOBBH8KZd43rBblO@cluster0.ho6yk14.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("databse connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(5000);
