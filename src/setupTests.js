import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

// Starts the server
// Passes the handlers
// Resets the server
// Closes the server
const server = setupServer(...handlers);

beforeAll(async () => {
    try {
        await server.listen();
        console.log('Mock server listening...');
    } catch (error) {
        console.error('Error setting up mock server:', error);
        process.exit(1);
    }
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(async () => {
    await server.close();
    console.log('Mock server closed.');
});
