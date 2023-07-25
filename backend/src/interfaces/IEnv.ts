export interface IEnv {
  PORT: string;
  MONGODB_URL: string;
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
  API_DF_URL: string;
  API_DF_TOKEN: string;
  API_DF_ENTITY_ID: string;
  API_DF_MID: string;
  API_DF_TID: string;
  API_DF_RISK: string;
  API_DF_SERV: string;
  LOAD_DATA: string;
  API_RATEHACK_URL: string;
  API_RATEHACK_USER: string;
  API_RATEHACK_PASSWORD: string;
  HOST_EMAIL: string;
  PORT_EMAIL: number;
  SECURE_EMAIL: boolean;
  USER_EMAIL: string;
  PASSWORD_EMAIL: string;
  TSL_EMAIL: string;
  REFRESH_EXPIRE_IN: string;
  ACCESS_EXPIRE_IN: string;
}
