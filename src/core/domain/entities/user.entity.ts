import { User as UserType } from "src/infrastructure/types/users/index.type"

export class User {
    constructor(
        public user: UserType,
    ){}

    public getCreateData(): UserType {
        return {
            firstname: this.user.firstname, 
            lastname: this.user.lastname, 
            email: this.user.email, 
            password: this.user.password, 
            phoneNumber: this.user.phoneNumber,
            address: this.user.address,
            role: 'cutomer',
        };
    }

    public getPassword(): string {
        return this.user.password;
    }
    public setPassword(password: string): void {
        this.user.password = password;
    }
}