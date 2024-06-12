import { environment as env } from "../../../environments/environment";
import { Urn } from "./urn.enum";

const ROOT_PATH = `http://${env.FRONTEND_HOST}:${env.FRONTEND_PORT}/api`;

export const BackEndPoints = {
  REGISTER: `${ROOT_PATH}/auth/${Urn.REGISTER}`,
  ACTIVATE: `${ROOT_PATH}/auth/${Urn.ACTIVATE}`,
  SIGN_IN: `${ROOT_PATH}/auth/${Urn.SIGN_IN}`,
  GET_CURRENT_USER: `${ROOT_PATH}/auth/${Urn.GET_CURRENT_USER}`,
  SIGN_OUT: `${ROOT_PATH}/auth/${Urn.SIGN_OUT}`,
  CHANGE_PASSWORD_REQUEST: `${ROOT_PATH}/auth/${Urn.CHANGE_PASSWORD}`,
  NEW_PASSWORD: `${ROOT_PATH}/auth/${Urn.NEW_PASSWORD}`,
  REFRESH_TOKEN: `${ROOT_PATH}/auth/${Urn.REFRESH_TOKEN}`,
  GET_USER:`${ROOT_PATH}/users/${Urn.GET_USER}`
} as const;
