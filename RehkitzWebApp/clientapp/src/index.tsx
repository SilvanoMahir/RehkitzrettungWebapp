import App from './App'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProtocolProvider, AppProvider, UserProvider } from './store/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const rootStyles = {
    height: '100%',
  };

root.render(
    <div style={rootStyles}>
      <AppProvider>
        <ProtocolProvider>
          <UserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserProvider>
        </ProtocolProvider>
        <ToastContainer enableMultiContainer containerId={'LoginToaster'} position={toast.POSITION.BOTTOM_LEFT} />
      </AppProvider>
    </div>
  );

