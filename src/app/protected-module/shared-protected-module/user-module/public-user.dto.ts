/* Ce dto devrait être dans le module public*/
export type NewPublicUserResponseDto = {
    readonly PSEUDO: string;
    readonly USER_NAME: string;
    readonly AVATAR: string;
    readonly ACTIVE: boolean;
    readonly ROLE: string;
}