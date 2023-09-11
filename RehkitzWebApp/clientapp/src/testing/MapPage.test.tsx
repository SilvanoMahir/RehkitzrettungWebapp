import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MapPage from '../components/pages/MapPage'

test('check if iframe exists', async () => {
  render(
    <MemoryRouter>
      <MapPage />
    </MemoryRouter>
  )

  const iframeElement = document.querySelector('iframe')
  const xpathResult = document.evaluate(
    '//iframe[@src="https://geogr.mapplus.ch/viewer/geogr/"]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  )
  const iframeByXPath = xpathResult.singleNodeValue
  expect(iframeByXPath).not.toBeNull()
  expect(iframeByXPath).toEqual(iframeElement)
})