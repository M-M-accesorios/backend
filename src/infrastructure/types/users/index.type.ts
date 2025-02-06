import { Document } from "mongoose";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    adress: string;
    role: string;
}

export type ErrorResponse = {
    success: boolean;
    message: string;
}
export type SuccessResponse = {
    success: boolean;
    token?: string;
}

export interface UserDocument extends User, Document {}