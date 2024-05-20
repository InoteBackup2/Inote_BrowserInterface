export class PublicUserDto {
    constructor(
        public name: string,
        public username: string,
        public password: string
    ) { }

    public serializedData(): string {
        return JSON.stringify(this);
    }
}