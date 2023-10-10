import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { addChat, addChatRoom, addParticipant, getChatRoom } from "../controllers/chat";

export const chatRoom = (app: Elysia) => {
    app.group("/chat", (app) => app.use(jwt({ name: "jwt", secret: "123456" }))
        .post('/create-chatroom', addChatRoom)
        .post("/add-participant", addParticipant)
        .get("/get-chat-room/:name", getChatRoom)
        .post('/add-chat', addChat));
}