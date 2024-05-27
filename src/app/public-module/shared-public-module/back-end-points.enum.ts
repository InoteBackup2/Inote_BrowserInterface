import { environment as env } from "../../../environments/environment"
const ROOT_PATH = `http://${env.FRONTEND_HOST}:${env.FRONTEND_PORT}/api`;
// OK, ce n’est pas vraiment une énumération selon TypeScript mais presque.
export const BackEndPoints = {
    REGISTER : `${ROOT_PATH}/auth/register`,
    ACTIVATE : `${ROOT_PATH}/auth/activation`,
    SIGN_IN : `${ROOT_PATH}/auth/sign_in`,
    GET_CURRENT_USER : `${ROOT_PATH}/auth/current-user`
} as const;