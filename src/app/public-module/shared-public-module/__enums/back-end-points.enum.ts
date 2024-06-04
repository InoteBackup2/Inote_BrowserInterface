import { environment as env } from "../../../../environments/environment";
const ROOT_PATH = `http://${env.FRONTEND_HOST}:${env.FRONTEND_PORT}/api`;
// OK, ce n’est pas vraiment une énumération selon TypeScript mais presque.
export const BackEndPoints = {
  REGISTER: `${ROOT_PATH}/auth/register`,
  ACTIVATE: `${ROOT_PATH}/auth/activation`,
  SIGN_IN: `${ROOT_PATH}/auth/sign_in`,
  GET_CURRENT_USER: `${ROOT_PATH}/auth/current-user`,
  SIGN_OUT: `${ROOT_PATH}/auth/sign_out`,
  CHANGE_PASSWORD_REQUEST: `${ROOT_PATH}/auth/change_password`,
  NEW_PASSWORD: `${ROOT_PATH}/auth/new_password`,
} as const;
