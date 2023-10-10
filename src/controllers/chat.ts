import Chatroom from "../models/Chatroom";
import User from "../models/User";

export const addChatRoom = async ({ body, headers, jwt, set }) => {
    const { id } = await jwt.verify(headers["authorization"]);
    if (!id) return { success: false, message: "Token Expired" };
    const user = await User.findById(id);
    if (!user) {
        set.status = 400;
        return { success: false, message: "user not found" };
    }
    const newChatRoom = new Chatroom({ name: body.name, admin: id });
    const savedChatRoom = await newChatRoom.save();
    if (!savedChatRoom) {
        set.status = 400;
        return { success: false, message: "Something went wrong" }
    }
    return { success: true, message: "Chat room created successfully", chatroom: savedChatRoom };
}

export const addParticipant = async ({ body, headers, jwt, set }) => {
    const { id: adminId } = await jwt.verify(headers["authorization"]);
    const user = await User.findOne({ email: body.email });
    if (!user) {
        set.status = 400;
        return { success: false, message: "user not found" };
    }
    if (!adminId) {
        set.status = 400;
        return { success: false, message: "Token Expired" };
    }
    const chatroom = await Chatroom.findById(body.room_id);
    if (chatroom?.admin != adminId) {
        set.status = 400;
        return { success: false, message: "Token Expired", chatroom, adminId };
    }
    if (chatroom?.participants?.includes(user?._id)) {
        set.status = 400;
        return { success: false, message: "User already added" }
    }
    chatroom?.participants.push(user._id);
    const room = await chatroom?.save();
    if (!room) {
        set.status = 400;
        return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "User added successfully", user }
}

export const getChatRoom = async ({ params, headers, jwt, set }) => {
    const { id } = await jwt.verify(headers["authorization"]);
    if (!id) return { success: false, message: "Token Expired" };
    const user = await User.findById(id);
    if (!user) {
        set.status = 400;
        return { success: false, message: "user not found" };
    }
    const chatRooms = (await Chatroom.find({ name: params.name })).map((item) => {
        return { name: item.name, id: item._id }
    });
    if (!chatRooms) {
        set.status = 400;
        return { success: false, message: "No Rooms Found" };
    }
    return { success: true, message: "Chat rooms", chatRooms };
}

export const removeParticipant = async ({ params, headers, jwt, set }) => {
    const { id } = await jwt.verify(headers["authorization"]);
    if (!id) return { success: false, message: "Token Expired" };
    const user = await User.findById(id);
    if (!user) {
        set.status = 400;
        return { success: false, message: "user not found" };
    }
    const chatRoom = await Chatroom.findById(params.room_id);
    if (!chatRoom) {
        set.status = 400;
        return { success: false, message: "Room not found" };
    }
    chatRoom.participants = chatRoom.participants.filter((item) => item != params.user_id);
    const room = await chatRoom.save();
    if (!room) {
        set.status = 400;
        return { success: false, message: "something went wrong" };
    }
    return { success: true, message: "user deleted successfully", room };
}

export const deleteChatRoom = async ({ params, headers, jwt, set }) => {
    const { id } = await jwt.verify(headers["authorization"]);
    if (!id) return { success: false, message: "Token Expired" };
    const user = await User.findById(id);
    if (!user) {
        set.status = 400;
        return { success: false, message: "user not found" };
    }
    const room = await Chatroom.findById(params.room_id);
    if (!room) {
        set.status = 400;
        return { success: false, message: "Room not found" };
    }
    if (room.admin != id) {
        set.status = 400;
        return { success: false, message: "Not authorized to perform the deletion of the room..." };
    }
    const deleted = await Chatroom.findByIdAndDelete(params.room_id);
    if (!deleted) {
        set.status = 400;
        return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "Room deleted successfully" }
}

export const getChatRoomsByUserId = async ({ headers, jwt, set }) => {
    const { id } = await jwt.verify(headers["authorization"]);
    if (!id) return { success: false, message: "Token Expired" };
    const user = await User.findById(id);
    if (!user) {
        set.status = 400;
        return { success: false, message: "user not found" };
    }
    const rooms = (await Chatroom.find({ participants: id })).map((item) => {
          return { id: item._id, name: item.name } 
        });
    if(!rooms){
    set.status = 400;
    return { success: false, message: "No rooms found" };
}
    return { success: true, message: "Rooms by user id", rooms }
}
export const addChat = async ({ headers, jwt }) => {
    const { id } = await jwt.verify(headers["authorization"]);
    if (!id) return { success: false, message: "Token Expired" };
    return { success: true, id };
}