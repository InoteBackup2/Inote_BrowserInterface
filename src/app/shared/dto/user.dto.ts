export class UserDto {
    constructor(
        public name: string,
        public username: string,
        public password: string
    ) { }

}export type NewUserRequestDto = {
    readonly NAME: string;
    readonly USER_NAME: string;
    readonly PASSWORD: string;
}