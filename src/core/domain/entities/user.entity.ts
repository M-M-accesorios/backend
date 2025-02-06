export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public phoneNumber: string,
        public adress: string,
        public role: string,
    ){}

    public getCreateData() {
        return {
            firstname: this.firstname, 
            lastname: this.lastname, 
            email: this.email, 
            password: this.password, 
            phoneNumber: this.phoneNumber,
            adress: this.adress,
            role: this.role,
        }
    }
}