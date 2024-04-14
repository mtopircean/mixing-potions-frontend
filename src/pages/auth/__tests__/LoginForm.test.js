import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../../../pages/auth/LoginForm';

const renderLoginForm = () => {
    render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>
    );
};

// Testing Submission of a login form with valid credentials

test('Submitting the login form with valid credentials redirects to designated page', async () => {
    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: 'testUser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'testPassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(window.location.pathname).toBe('/');
});
