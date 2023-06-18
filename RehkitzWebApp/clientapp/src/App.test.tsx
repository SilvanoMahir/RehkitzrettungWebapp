import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Rehkitzrettung app', () => {
  render(<MemoryRouter>
            <App />
         </MemoryRouter>)
  const linkElement = screen.getByTestId("login-anmelden-title")
  expect(linkElement).toBeInTheDocument()
})
