export type ProtectedUserResponseDto = {
    readonly email: string;
    readonly active: boolean;
    readonly pseudonyme: string;
    readonly avatar: string;
    readonly roleName: string;
}