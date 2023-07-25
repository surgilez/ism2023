import { IEnv } from '@interfaces/IEnv';
import { config } from 'dotenv';

config();

const {
  MONGODB_URL,
  PORT,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  API_DF_URL,
  API_DF_ENTITY_ID,
  API_DF_MID,
  API_DF_TID,
  API_DF_TOKEN,
  API_DF_RISK,
  API_DF_SERV,
  LOAD_DATA,
  API_RATEHACK_URL,
  API_RATEHACK_USER,
  API_RATEHACK_PASSWORD,
  REFRESH_EXPIRE_IN,
  ACCESS_EXPIRE_IN,
} = process.env as unknown as IEnv;

export const port = String(PORT);

export const mongodbUrl = String(MONGODB_URL);

export const tokens = {
  accessToken: String(ACCESS_TOKEN),
  refreshToken: String(REFRESH_TOKEN),
  accessExpireIn: String(ACCESS_EXPIRE_IN),
  refreshExpireIn: String(REFRESH_EXPIRE_IN),
};

export const apiDf = {
  url: String(API_DF_URL),
  token: String(API_DF_TOKEN),
  entityId: String(API_DF_ENTITY_ID),
  tid: String(API_DF_TID),
  mid: String(API_DF_MID),
  risk: String(API_DF_RISK),
  serv: String(API_DF_SERV),
};

export const uploadData = Boolean(String(LOAD_DATA) === 'true');

export const apiRatehack = {
  url: String(API_RATEHACK_URL),
  user: String(API_RATEHACK_USER),
  password: String(API_RATEHACK_PASSWORD),
};
