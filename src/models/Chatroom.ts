import mongoose, { Document, Schema, Model } from 'mongoose';


interface IMessage {
    sent_by?: string;
    sent_at?: string;
    message: string;
}

const MessageSchema = new Schema<IMessage>({
    sent_by: { type: String, required: false },
    sent_at: { type: String, required: false },
    message: { type: String, required: true },
});

interface IChatroom extends Document {
    admin: string;
    participants: string[];
    name: string;
    messages: IMessage[];
}

const ChatroomSchema = new Schema<IChatroom, Model<IChatroom>>({
    admin: { type: String, required: true },
    participants: { type: [String], required: false },
    name: { type: String, required: true },
    messages: [MessageSchema],
});

const ChatroomModel: Model<IChatroom> = mongoose.model('gcChatroom', ChatroomSchema);

export default ChatroomModel;
