import { get } from 'env-var';

import { loadEnv } from './env';

loadEnv();

export const getRequired = (env: string) => get(env).required();

export const config = {
  get databaseUrl() {
    return getRequired('DATABASE_URL').asString();
  },
  get jwtSecret() {
    return getRequired('JWT_SECRET').asString();
  },
  get getSaltRounds() {
    return getRequired('SALT_ROUNDS').asInt();
  },
  get emailAdmin() {
    return getRequired('EMAIL_ADMIN').asString();
  },
  get usernameAdmin() {
    return getRequired('EMAIL_USERNAME').asString();
  },
  get passAdmin() {
    return getRequired('EMAIL_ADMIN_PASSWORD').asString();
  },
};
