import mongoose, { Schema } from 'mongoose'
import { UserDocument } from "src/infrastructure/types/users/index.type";

const UserSchema: Schema = new Schema({
    firstname: {
        type: String,
        required: true 
    },
    lastname: {
        type: String,
        required: true 
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    phoneNumber: {
        type: String,
        required: true 
    },
    address: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true 
    },
})

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);