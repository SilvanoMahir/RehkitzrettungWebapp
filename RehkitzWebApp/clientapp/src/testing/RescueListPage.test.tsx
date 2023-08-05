import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import RescueListPage from '../components/pages/RescueListPage'

test('buttons and search input are present and clickable', async () => {
  render(
    <MemoryRouter>
      <RescueListPage />
    </MemoryRouter>
  )
  const downloadButton = screen.getByRole('button', { name: 'Bericht herunterladen' })
  expect(downloadButton).toBeInTheDocument()
  expect(downloadButton).toBeEnabled()

  const createButton = screen.getByRole('button', { name: 'Neues Protokoll erstellen' })
  expect(createButton).toBeInTheDocument()
  expect(createButton).toBeEnabled()
})