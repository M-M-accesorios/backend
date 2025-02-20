import { AppConfig } from "../types/app"

export const appConfig: AppConfig = {
    port: 8000,
    cors: {
        origin: process.env.APP_FRONT_URL,
        methods: process.env.CORS_ALLOWED_METHODS,
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    }
  }