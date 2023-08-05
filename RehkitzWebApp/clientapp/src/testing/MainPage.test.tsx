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
  const labels = screen.queryAllByText(/Anzahl Aufgebote|Gerettete Kitze|Verletzte Kitze|Markierte Kitze/i)
  expect(labels).toHaveLength(4)
})

