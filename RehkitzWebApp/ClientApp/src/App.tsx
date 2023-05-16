import { Route, Routes } from 'react-router-dom'
import RescueListPage from 'components/pages/RescueListPage'

export const ROUTE_RESCUE_LIST_PAGE = '/' // TODO: Change this route to '/rescuelist' in near future

export default function App() {
    return (
        <Routes>
            <Route path={ROUTE_RESCUE_LIST_PAGE} element={<RescueListPage />} />
        </Routes>
    )
}