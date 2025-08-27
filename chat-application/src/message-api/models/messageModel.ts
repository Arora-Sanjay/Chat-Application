import {Schema, model} from 'mongoose';

const messageSchema = new Schema({
    senderid: {
        type: String,
        required: true,
    },
    recipientId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    }
});
export const Message = model('Message', messageSchema);
