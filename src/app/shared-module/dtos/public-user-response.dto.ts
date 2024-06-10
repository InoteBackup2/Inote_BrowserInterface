import { Role } from "../enums/role.enum";

export type PublicUserResponseDto = {
    readonly pseudo: string;
    readonly username: string;
    readonly avatar: string;
    readonly actif: boolean;
    readonly role: Role;
  };