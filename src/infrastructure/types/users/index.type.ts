import { Document } from "mongoose";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    role?: string;
}

export type ErrorResponse = {
    success: boolean;
    message: string;
}
export type SuccessResponse = {
    success: boolean;
    token?: string;
    data?: UserDocument;
}

export type TokenResponse = {
    token: string;
}

export interface UserDocument extends User, Document {}