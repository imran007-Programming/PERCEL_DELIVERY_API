import dotenv from "dotenv";
dotenv.config();
interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  SALT_ROUND: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;

  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_SECRET_EXPIRES: string;
  USER_EMAIL: string;
  APP_PASSWORD: string;
}

const loadlEnvVariables = (): EnvConfig => {
  const envVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "SALT_ROUND",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_SECRET_EXPIRES",
    "USER_EMAIL",
    "APP_PASSWORD",
  ];
  envVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing env variable:${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    SALT_ROUND: process.env.SALT_ROUND as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_SECRET_EXPIRES: process.env
      .JWT_REFRESH_SECRET_EXPIRES as string,
    USER_EMAIL: process.env.USER_EMAIL as string,
    APP_PASSWORD: process.env.APP_PASSWORD as string,
  };
};

export const envVars = loadlEnvVariables();
