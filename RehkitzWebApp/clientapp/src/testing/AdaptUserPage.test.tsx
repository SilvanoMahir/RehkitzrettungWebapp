import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdaptUserPage from '../components/pages/AdaptUserPage'

test('check placeholders and labels in AdaptUserPage', () => {
  render(
    <MemoryRouter>
      <AdaptUserPage />
    </MemoryRouter>
  )

  const userFirstNameLabel = screen.getByText('Vorname')
  const userLastNameLabel = screen.getByText('Name')
  const userDefinitionLabel = screen.getByText('Bezeichnung')
  const userRegionLabel = screen.getByText('Region')
  const userFunctionLabel = screen.getByText('Funktion')
  const userNameLabel = screen.getByText('Benutzername')
  const userPasswordLabel = screen.getByText('Passwort')

  expect(userFirstNameLabel).toBeInTheDocument()
  expect(userLastNameLabel).toBeInTheDocument()
  expect(userDefinitionLabel).toBeInTheDocument()
  expect(userRegionLabel).toBeInTheDocument()
  expect(userFunctionLabel).toBeInTheDocument()
  expect(userNameLabel).toBeInTheDocument()
  expect(userPasswordLabel).toBeInTheDocument()
})
