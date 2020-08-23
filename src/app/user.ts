export class User {
    constructor(
        public id: number,
        public username: string,
        public name: string,
        public active: boolean,
        public createdAt: Date,
        public settlementId: number
    ){}
}