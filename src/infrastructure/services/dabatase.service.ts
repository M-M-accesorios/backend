// src/infrastructure/services/database.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { databaseConfig } from '../config/database.config';

@Injectable()
export class DatabaseService {
    private readonly logger: Logger = new Logger(DatabaseService.name);
    private readonly mongoUri: string  = databaseConfig.uri as string;

    async connect(): Promise<void> {
        try {
            await mongoose.connect(this.mongoUri);
            this.logger.log('Successfully connected to the database');
        } catch (error) {
            this.logger.error('Error connecting to the database', error);
            throw new Error('Database connection failed');
        }
    }
}

export const DatabaseServiceInstance = new DatabaseService()