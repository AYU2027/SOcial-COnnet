import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'; // <-- Import the hook

function App() {
  const { authUser } = useAuthContext(); // Get the authenticated user

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        {/* 
          Home Route:
          - If authUser exists (user is logged in), show the Home page.
          - Otherwise, redirect them to the Login page.
        */}
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />

        {/* 
          Login Route:
          - If authUser exists (user is logged in), redirect them to the Home page.
          - Otherwise, show the Login page.
        */}
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        
        {/* 
          Signup Route:
          - If authUser exists (user is logged in), redirect them to the Home page.
          - Otherwise, show the SignUp page.
        */}
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;