import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdaptProtocolPage from '../components/pages/AdaptProtocolPage'

test('check placeholders and labels in AdaptProtocolPage', () => {
    render(
        <MemoryRouter>
            <AdaptProtocolPage />
        </MemoryRouter>
    )

    const clientFullNameLabel = screen.getByText('Auftraggeber')
    const pilotFullNameLabel = screen.getByText('Pilot')
    const localNameLabel = screen.getByText('Lokalname')
    const regionLabel = screen.getByText('Region')
    const dateLabel = screen.getByText('Datum')
    const areaSizeLabel = screen.getByText('Fläche')
    const foundFawnsLabel = screen.getByText('Gefundene Kitze')
    const injuredFawnsLabel = screen.getByText('Verletzte Kitze')
    const markedFawnsLabel = screen.getByText('Markierte Kitze')
    const remarkLabel = screen.getByText('Bemerkung')

    expect(clientFullNameLabel).toBeInTheDocument()
    expect(pilotFullNameLabel).toBeInTheDocument()
    expect(localNameLabel).toBeInTheDocument()
    expect(regionLabel).toBeInTheDocument()
    expect(dateLabel).toBeInTheDocument()
    expect(areaSizeLabel).toBeInTheDocument()
    expect(foundFawnsLabel).toBeInTheDocument()
    expect(injuredFawnsLabel).toBeInTheDocument()
    expect(markedFawnsLabel).toBeInTheDocument()
    expect(remarkLabel).toBeInTheDocument()
})
