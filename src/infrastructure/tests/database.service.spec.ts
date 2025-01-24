import mongoose from "mongoose";
import { DatabaseServiceInstance } from "../services/dabatase.service"

jest.mock('mongoose', () => ({
    connect: jest.fn()
}))

describe("DatabaseService", () => {
    let fixtures: ReturnType<typeof getFixtures>;

    beforeAll(() => {
        fixtures = getFixtures();
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe("connect", () => {
        it('Should connect to the database successfully', async () => {
            fixtures.whenMongooseConnectSucceeds();
            await fixtures.whenConnectingToDatabase();
            fixtures.thenShouldCallMongooseConnectWithCorrectUri();
        });

        describe('When the database connection fails', () => {
            it('should throw an exception', async () => {
                fixtures.whenMongooseConnectFails();
                await expect(fixtures.whenConnectingToDatabase()).rejects.toThrow('Database connection failed');
                fixtures.thenShouldCallMongooseConnectWithCorrectUri();
            });
        })
    })
})

const getFixtures = () => {
    const mockMongoUri = 'mongodb://localhost:27017/m&m';

    const whenMongooseConnectSucceeds = () => {
        (mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined);
    }
    const whenMongooseConnectFails = () => {
        (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'));
    }
    const whenConnectingToDatabase = async () => {
        return DatabaseServiceInstance.connect();
    }
    const thenShouldCallMongooseConnectWithCorrectUri = () => {
        expect(mongoose.connect).toHaveBeenCalledWith(mockMongoUri);
    }

    return {
        whenMongooseConnectSucceeds,
        whenMongooseConnectFails,
        whenConnectingToDatabase,
        thenShouldCallMongooseConnectWithCorrectUri
    }
}