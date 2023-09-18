import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UserListPage from '../components/pages/UserListPage'

test('check if create new user buttons exists', async () => {
    render(
        <MemoryRouter>
            <UserListPage />
        </MemoryRouter>
    )

    const createNewUserButton = screen.getByRole('button', { name: 'Neuer Benutzer erstellen' })
    expect(createNewUserButton).toBeInTheDocument()
})