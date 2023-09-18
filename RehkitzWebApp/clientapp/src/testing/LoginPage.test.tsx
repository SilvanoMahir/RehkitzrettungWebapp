import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from '../components/pages/LoginPage'
import { toast } from 'react-toastify'
import debug from 'debug'
import App from '../App'
import { ProtocolProvider, AppProvider, UserProvider } from '../store/context'
import { MemoryRouter } from 'react-router'

test('all fields are present on the LoginPage', () => {
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('Benutzername')
    const passwordInput = screen.getByPlaceholderText('Passwort')
    const submitButton = screen.getByRole('button', { name: 'Anmelden' })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
})

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        POSITION: {
            TOP_CENTER: 'top-center',
        },
    },
}))

test('toast notification appears when login button is clicked with empty fields', async () => {
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    )

    const submitButton = screen.getByRole('button', { name: 'Anmelden' })
    fireEvent.click(submitButton)

    expect(toast.error).toHaveBeenCalledWith(
        'Bitte Benutzername und Password einsetzen!', {
            position: 'top-center',
            containerId: 'ToasterNotification',
        }
    )
})

test('login routing', async () => {
    render(
        <AppProvider>
            <ProtocolProvider>
                <UserProvider>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </UserProvider>
            </ProtocolProvider>
        </AppProvider>
    )

    if (process.env.NODE_ENV === 'development') {
        debug.enable
    }

    const inputUsrname = screen.getByPlaceholderText('Benutzername')
    fireEvent.change(inputUsrname, { target: { value: 'admin' } })
    const inputPswd = screen.getByPlaceholderText('Passwort')
    fireEvent.change(inputPswd, { target: { value: 'Password@123' } })

    const submitButton = screen.getByRole('button', { name: 'Anmelden' })
    fireEvent.click(submitButton)

    expect(screen.getByDisplayValue('admin')).toBeInTheDocument()

    await waitFor(() =>
        expect(screen.getByText('Willkommen')).toBeInTheDocument()
    )
})