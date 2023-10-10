import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/bcrypt";
export const signUpController = async ({ body, set }) => {
    const keys = ["first_name", "last_name", "email", "password"];
    for (let item of keys) {
        if (!body[item]) {
            set.status = 400;
            return { success: false, message: `${item} is required` }
        }
    }
    const { first_name, last_name, email, password } = body || {};
    const user = await User.findOne({ email });
    if (user) {
        set.status = 400;
        return { success: false, message: "Email already exists... Kindly Login...", }
    }
    const newUser = new User({ first_name, last_name, email });
    const { hash, salt } = await hashPassword(password);
    newUser.salt = salt;
    newUser.password = hash;
    const savedUser = await newUser.save();
    if (savedUser) return { success: true, message: "Account created successfully", user: savedUser }
    set.status = 400;
    return { success: false, message: "something went wrong", }
}

export const loginController = async ({ body, set, jwt }) => {
    const { email, password } = body || {};
    if (!email || !password) {
        set.status = 400;
        return { success: false, message: "Invalid Credentials" }
    }
    const user = await User.findOne({ email });
    if (!user) {
        set.status = 400;
        return { success: false, message: "User Not Found" }
    }
    const isVerified = await comparePassword(password, user.salt, user.password);
    if (!isVerified) {
        set.status = 400;
        return { success: false, message: "Invalid Credentials" };
    }
    const token = await jwt.sign({ id: user._id });
    return { success: true, message: "Logged In successfully", token }
}