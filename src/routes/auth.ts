import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { signUpController, loginController } from "../controllers/auth";

export const auth = (app: Elysia) => {
    app.group("/auth", (app) => app.use(jwt({ name: "jwt", secret: "123456" }))
        .post('/signup', signUpController)
        .post('/login', loginController))
}