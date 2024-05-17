export class PublicUserDto {
    constructor(
        public pseudo: string,
        public username : string,
        public avatar: string,
        public actif: boolean,
        public role : string
    ){}

    public serializedData(): string{
        return JSON.stringify(this);
    }   
}