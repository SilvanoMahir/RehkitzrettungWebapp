import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Rehkitzrettung app', () => {
  render(<MemoryRouter>
            <App />
         </MemoryRouter>)
  const linkElement = screen.getByText(/Willkommen zur Rehkitzrettung App/i)
  expect(linkElement).toBeInTheDocument()
})
