import App from './App'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProtocolProvider, AppProvider, UserProvider, RegionProvider } from './store/context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useState, useEffect } from 'react';


const InstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallPrompt = () => {
        if (deferredPrompt) {
            (deferredPrompt as any).prompt();
            (deferredPrompt as any).userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <div>
            {/* Here you can add a button or another UI element to trigger the installation popup */}
            <button onClick={handleInstallPrompt}>Install</button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const rootStyles = {
    height: '100%',
};

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
            <InstallPrompt />
        </AppProvider>
    </div>
);