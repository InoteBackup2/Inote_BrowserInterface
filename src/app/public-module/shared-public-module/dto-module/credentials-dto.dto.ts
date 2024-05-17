export class CredentialsDto {
  public bearer: string;
  public refresh: string;

  constructor(bearer: string, refresh: string) {
    this.bearer = bearer;
    this.refresh = refresh;
  }

  serializedData(): string {
    return JSON.stringify(this);
  }
}
