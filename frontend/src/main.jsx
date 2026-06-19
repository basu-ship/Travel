import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster
    position="top-center"
  containerStyle={{
    top: 90
  }}
  toastOptions={{
    duration: 3000,
    style: {
      background: "#111827",
      color: "#fff",
      border: "1px solid #facc15"
    }
  }}
    />
    <App />
  </BrowserRouter>
)
