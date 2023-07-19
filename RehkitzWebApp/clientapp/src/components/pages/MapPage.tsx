import Iframe from 'react-iframe'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { Menu } from '../widgets/Menu'

export default function RescueListPage() {
    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })

    return (
        <MapLayout>
            {!isNotMobile && <Menu />}
            <MapRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <MapBlock>
                    <Iframe url="https://geogr.mapplus.ch/viewer/geogr/"
                        height="100%"
                        width="100%"
                        id=""
                        className=""
                        display="block"
                        position="relative" />
                </MapBlock>
            </MapRowLayout>
        </MapLayout>
    )
}

const MapBlock = styled.div`
    width: 100%
`

const MapLayout = styled.div`
    height: 100%;
`

const MapRowLayout = styled.div`
    display: flex;
    height: 100%;
`
