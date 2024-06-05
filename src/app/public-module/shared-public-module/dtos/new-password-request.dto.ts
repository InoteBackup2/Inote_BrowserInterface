export type NewPasswordRequestDto = {
    readonly email: string;
    readonly code: string;
    readonly password: string;
}