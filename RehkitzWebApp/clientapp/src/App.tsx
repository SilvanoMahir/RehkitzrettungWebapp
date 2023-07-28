import { Route, Routes } from 'react-router-dom'
import RescueListPage from './components/pages/RescueListPage'
import LoginPage from './components/pages/LoginPage'
import AdaptProtocolPage from './components/pages/AdaptProtocolPage'
import MapPage from './components/pages/MapPage'
import UserListPage from './components/pages/UserListPage'
import AdaptUserPage from './components/pages/AdaptUserPage'

export const ROUTE_LOGIN_PAGE = '/'
export const ROUTE_RESCUE_LIST_PAGE = '/rescuelist'
export const ROUTE_MAP_PAGE = '/map'
export const ROUTE_ADAPT_PROTOCOL_PAGE = '/adaptprotocol'
export const ROUTE_USER_LIST_PAGE = '/users'
export const ROUTE_ADAPT_USER_PAGE = '/adaptuser'

export default function App() {
    return (
        <Routes>
            <Route path={ROUTE_LOGIN_PAGE} element={<LoginPage />} />
            <Route path={ROUTE_RESCUE_LIST_PAGE} element={<RescueListPage />} />
            <Route path={ROUTE_ADAPT_PROTOCOL_PAGE} element={<AdaptProtocolPage />} />
            <Route path={`${ROUTE_ADAPT_PROTOCOL_PAGE}/:id`} element={<AdaptProtocolPage />} />
            <Route path={ROUTE_MAP_PAGE} element={<MapPage />} />
            <Route path={ROUTE_USER_LIST_PAGE} element={<UserListPage />} />
            <Route path={`${ROUTE_ADAPT_USER_PAGE}/:id`} element={<AdaptUserPage />} />
            <Route path={ROUTE_ADAPT_USER_PAGE} element={<AdaptUserPage />} />
        </Routes >
    )
}