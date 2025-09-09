// frontend/src/main.jsx
// ... imports
import { SocketContextProvider } from './context/SocketContext.jsx'; // <-- Import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider> {/* <-- Add the wrapper */}
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);