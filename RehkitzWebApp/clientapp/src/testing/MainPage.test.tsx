import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MainPage from '../components/pages/MainPage'
import { MemoryRouter } from 'react-router-dom'


test('labels are present in the MainPage component', () => {
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  )

  const rescueNumbersLabel = screen.getByText('Anzahl Aufgebote')
  const savedFawnsLabel = screen.getByText('Gerettete Kitze')
  const injuredFawnsLabel = screen.getByText('Verletzte Kitze')
  const markedFawnsLabel = screen.getByText('Markierte Kitze')

  expect(rescueNumbersLabel).toBeInTheDocument()
  expect(savedFawnsLabel).toBeInTheDocument()
  expect(injuredFawnsLabel).toBeInTheDocument()
  expect(markedFawnsLabel).toBeInTheDocument()
})

