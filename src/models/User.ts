import mongoose, { Model, Schema } from "mongoose";

interface User {
    first_name: string,
    last_name: string,
    profile_url?: string,
    password: string,
    email: string,
    status: boolean,
    role: string,
    salt: string,
}

const UserModel = new Schema<User, Model<User>>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_url: { type: String, required: false },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Boolean, default: false },
    role: { type: String, default: "USER" },
})

export default mongoose.model("gcUsers", UserModel);
