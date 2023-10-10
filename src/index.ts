import Elysia from "elysia";
import mongoose from "mongoose";
import { auth } from "./routes/auth";
import { chatRoom } from "./routes/chat";
const app = new Elysia();
app.use(auth);
app.use(chatRoom);
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
