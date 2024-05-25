export class ActivationCodeDto {
    constructor(
        public code : string
    ){}

    public serializedData(): string{
        return JSON.stringify(this);
    }
}

export type NewActivationCodeDto = {
    readonly CODE: string;
}