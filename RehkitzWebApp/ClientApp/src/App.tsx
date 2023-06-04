import { Route, Routes } from 'react-router-dom'
import RescueListPage from './components/pages/RescueListPage'
import LoginPage from './components/pages/LoginPage'


export const ROUTE_RESCUE_LIST_PAGE = '/rescuelist' 
export const ROUTE_LOGIN_PAGE = '/' 

export default function App() {
    return (
        <Routes>
            <Route path={ROUTE_LOGIN_PAGE} element={<LoginPage />} />
            <Route path={ROUTE_RESCUE_LIST_PAGE} element={<RescueListPage />} />
        </Routes>
    )
}