import App from './App'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProtocolProvider, AppProvider } from './store/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <AppProvider>
        <ProtocolProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter> 
        </ProtocolProvider>
        <ToastContainer enableMultiContainer containerId={'LoginToaster'} position={toast.POSITION.BOTTOM_LEFT} />
    </AppProvider>
)