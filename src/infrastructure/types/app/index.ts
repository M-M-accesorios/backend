export interface AppConfig {
    port: number,
    cors: {
        origin: string;
        methods: string;
        allowedHeaders: string;
        credentials: boolean,
    }
}