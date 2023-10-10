import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { addChat, addChatRoom, addParticipant, getChatRoom, removeParticipant, deleteChatRoom, getChatRoomsByUserId } from "../controllers/chat";

export const chatRoom = (app: Elysia) => {
    app.group("/chat", (app) => app.use(jwt({ name: "jwt", secret: "123456" }))
        .post('/create-chatroom', addChatRoom)
        .post("/add-participant", addParticipant)
        .get("/get-chat-room/:name", getChatRoom)
        .get("/get-chat-rooms-by-id", getChatRoomsByUserId)
        .delete("/delete-chat-room/:room_id", deleteChatRoom)
        .delete("/remove-participant/:room_id/:user_id", removeParticipant)
        .post('/add-chat', addChat));
}