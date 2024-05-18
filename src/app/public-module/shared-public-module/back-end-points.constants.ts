import { environment } from "../../../environments/environment"
export class BackEndPoints {
    private static readonly ROOT_PATH = `http://${environment.FRONTEND_HOST}:${environment.FRONTEND_PORT}/api`;
    public static readonly REGISTER = `${this.ROOT_PATH}/auth/register`;
    public static readonly ACTIVATE = `${this.ROOT_PATH}/auth/activation`;
    public static readonly SIGN_IN = `${this.ROOT_PATH}/auth/sign_in`;
    public static readonly GET_CURRENT_USER = `${this.ROOT_PATH}/auth/current-user`;
}
