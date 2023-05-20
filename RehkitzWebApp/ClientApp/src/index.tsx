import App from 'App'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProtocolProvider} from 'store/context'


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <ProtocolProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </ProtocolProvider>
)