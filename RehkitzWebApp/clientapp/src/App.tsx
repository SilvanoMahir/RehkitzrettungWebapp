import { Route, Routes } from 'react-router-dom'
import RescueListPage from './components/pages/RescueListPage'
import LoginPage from './components/pages/LoginPage'
import AdaptProtocolPage from './components/pages/AdaptProtocolPage'

export const ROUTE_LOGIN_PAGE = '/'
export const ROUTE_RESCUE_LIST_PAGE = '/rescuelist'
export const ROUTE_ADAPT_PROTOCOL_PAGE = '/adaptprotocol'

export default function App() {
    return (
        <Routes>
            <Route path={ROUTE_LOGIN_PAGE} element={<LoginPage />} />
            <Route path={ROUTE_RESCUE_LIST_PAGE} element={<RescueListPage />} />
            <Route path={ROUTE_ADAPT_PROTOCOL_PAGE} element={<AdaptProtocolPage />} />
        </Routes >
    )
}