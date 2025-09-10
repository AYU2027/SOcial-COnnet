import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import LandingPage from './pages/landing/LandingPage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      {/* Use the new mesh gradient background */}
      <div className="mesh-gradient-bg"></div>

      <Navbar />
      
      <main className='pt-28 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser ? <Navigate to='/chat' /> : <LandingPage />} />
          <Route path='/chat' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={authUser ? <Navigate to='/chat' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/chat' /> : <SignUp />} />
        </Routes>
      </main>

      <Toaster />
    </>
  );
}

export default App;