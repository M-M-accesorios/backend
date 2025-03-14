import { Request } from "express";
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

export type TokenResponse = {
    token: string;
}

export interface GetUserRequest extends Request{
    id: string;
}

export interface UserDocument extends User, Document {}