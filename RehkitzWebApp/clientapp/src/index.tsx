import App from './App'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProtocolProvider, AppProvider, UserProvider, RegionProvider } from './store/context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const rootStyles = {
    height: '100%',
}

root.render(
    <div style={rootStyles}>
        <AppProvider>
            <ProtocolProvider>
                <UserProvider>
                    <RegionProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </RegionProvider>
                </UserProvider>
            </ProtocolProvider>
            <ToastContainer enableMultiContainer containerId={'ToasterNotification'} />
        </AppProvider>
    </div>
)

