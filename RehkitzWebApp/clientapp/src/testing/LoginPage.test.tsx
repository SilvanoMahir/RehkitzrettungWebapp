import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from '../components/pages/LoginPage'
import { MemoryRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

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

  const submitButton = screen.getByRole('button', { name: 'Anmelden' });
  fireEvent.click(submitButton)

  expect(toast.error).toHaveBeenCalledWith(
    'Bitte Benutzername und Password einsetzen!',
    {
      position: 'top-center',
      containerId: 'LoginToaster',
    }
  )
})