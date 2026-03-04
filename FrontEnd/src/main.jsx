import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { SongProvider } from './features/home/song.context.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <SongProvider>
            <App />
        </SongProvider>
    </AuthProvider>
)
