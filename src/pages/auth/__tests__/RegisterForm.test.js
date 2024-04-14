import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import axios from 'axios';

jest.mock('axios');

describe('RegisterForm', () => {
    test('renders RegisterForm component', () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );
        expect(screen.getByText(/Register:/i)).toBeInTheDocument();
    });

    // Testing submission of a registration form
    test('submits the registration form with valid data', async () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        const usernameInput = screen.getByLabelText(/Username/i);
        const emailInput = screen.getByLabelText(/Email address/i);
        const passwordInputs = screen.getAllByLabelText(/Password/i);
        const registerButton = screen.getByRole('button', {
            name: /Register/i,
        });

        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInputs[0], {
            target: { value: 'password123' },
        });
        fireEvent.change(passwordInputs[1], {
            target: { value: 'password123' },
        });

        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                '/dj-rest-auth/registration/',
                {
                    username: 'testUser',
                    email: 'test@example.com',
                    password1: 'password123',
                    password2: 'password123',
                }
            );
        });
    });

    test('displays error message if registration fails', async () => {
        axios.post.mockRejectedValue({
            response: {
                data: { email: ['Email already exists.'] },
            },
        });

        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        const registerButton = screen.getByRole('button', {
            name: /Register/i,
        });

        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(
                screen.getByText(/Email already exists./i)
            ).toBeInTheDocument();
        });
    });
});
