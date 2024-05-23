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

export type NewPublicUserRequestDto = {
    readonly NAME: string;
    readonly USER_NAME: string;
    readonly PASSWORD: string;
}